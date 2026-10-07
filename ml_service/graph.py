import re
from langgraph.graph import START, END, StateGraph
from langchain_ollama import ChatOllama
from tools import Search_For_the_product, search_web_for_idea
from schemas import AppState
from memory import find_similar_idea, save_idea
from scoring import (
    calculate_saturation_score,
    calculate_opportunity_score,
)

# LLM
llm = ChatOllama(
    model="llama3.2:3b",
    temperature=0,
)

# HELPERS
def strip_think(text: str) -> str:
    """
    Remove <think>...</think> blocks if the local model produces them.
    """

    return re.sub(
        r"<think>.*?</think>",
        "",
        text,
        flags=re.DOTALL,
    ).strip()


def extract_integer(text: str) -> int:
    """
    Extract the first integer from an LLM response.
    """
    match = re.search(r"\d+", text)

    if not match:
        return 0

    return int(match.group())

# CACHE
def check_cache(state: AppState):

    match, score = find_similar_idea(
        state["idea"]
    )

    if match:

        print(
            f"[memory] Found a similar past idea "
            f"(similarity: {score:.0%}) — "
            f"reusing cached result."
        )

        return {
            "result": match["result"],
            "features": match["features"],
            "search_query": match["search_query"],
            "from_cache": True,
        }

    return {
        "from_cache": False
    }


def route_after_cache(state: AppState):

    if state["from_cache"]:
        return "cached"

    return "fresh"


# SAVE CACHE
def save_to_cache(state: AppState):

    save_idea(
        idea=state["idea"],
        search_query=state["search_query"],
        result=state["result"],
        features=state["features"],
    )

    return {}


# QUERY GENERATION
def generate_query(state: AppState):

    prompt = f"""
You are researching whether a startup idea already exists.

User idea:
{state["idea"]}

Generate a concise search query that would find products
most directly related to this idea.

Focus on the actual product category, problem and target user.

Return ONLY the search query.
Do not explain your answer.
"""

    response = llm.invoke(prompt)

    query = strip_think(
        response.content
    )

    return {
        "search_query": query
    }


# SEARCH
def search_products(state: AppState):

    query = state["search_query"]

    print(
        f"[research] Searching for: {query}"
    )

    web_results = search_web_for_idea(
        query
    )

    try:

        products = Search_For_the_product(
            query
        )

    except RuntimeError as e:

        print(
            f"[warning] Product Hunt search failed: {e}"
        )

        products = []

    return {
        "web_results": web_results,
        "products": products,
    }


# COMPETITOR ANALYSIS
def compare_products(state: AppState):

    prompt = f"""
You are a startup competition analyst.

User's startup idea:
{state["idea"]}

Web search results:
{state["web_results"]}

Product Hunt results:
{state["products"]}

Your task is to identify products that are genuinely
competitive with the user's idea.

IMPORTANT:

A product should be considered a DIRECT COMPETITOR only when
its core purpose substantially overlaps with the user's idea.

Do NOT consider a product a competitor merely because:

- it uses AI
- it has a chatbot
- it is a developer tool
- it is an AI platform
- it supports AI builders
- it has some vaguely related functionality

For every product, classify it as one of:

DIRECT_COMPETITOR
RELATED
IRRELEVANT

Only DIRECT_COMPETITOR products should be treated as
competition for scoring.

Return the following structure:

STATUS: EXISTS or NOT_FOUND

DIRECT COMPETITORS:
1. <product> — <why it directly competes>
2. <product> — <why it directly competes>

RELATED PRODUCTS:
1. <product> — <why it is related>

IRRELEVANT RESULTS:
1. <product>

If there are no genuine direct competitors:

STATUS: NOT_FOUND

DIRECT COMPETITORS:
None

Do not invent competitors.
"""

    result = llm.invoke(prompt)

    analysis = strip_think(
        result.content
    )

    return {
        "result": analysis
    }


# SCORING
def calculate_scores(state: AppState):

    analysis = state["result"]

    # Count direct competitors
    competitor_prompt = f"""
You are extracting structured information.

Competition analysis:
{analysis}

Count ONLY the products listed under:

DIRECT COMPETITORS:

Do not count RELATED PRODUCTS.
Do not count IRRELEVANT RESULTS.

Return ONLY the integer count.
"""

    competitor_response = llm.invoke(
        competitor_prompt
    )

    direct_competitors = extract_integer(
        strip_think(
            competitor_response.content
        )
    )

    # Count highly similar competitors
    similarity_prompt = f"""
You are analyzing startup competition.

Competition analysis:
{analysis}

Count how many products under DIRECT COMPETITORS
are highly similar to the user's idea.

A highly similar competitor has substantially overlapping
core functionality and target use case.

Return ONLY the integer count.
"""

    similarity_response = llm.invoke(
        similarity_prompt
    )

    high_similarity = extract_integer(
        strip_think(
            similarity_response.content
        )
    )

    # Research result counts
    web_results = state.get(
        "web_results",
        []
    )

    products = state.get(
        "products",
        []
    )

    total_results = (
        len(web_results)
        + len(products)
    )

    # Source coverage
    source_count = 0

    if web_results:
        source_count += 1

    if products:
        source_count += 1

    # Saturation score
    scoring = calculate_saturation_score(
        direct_competitors=direct_competitors,
        high_similarity=high_similarity,
        total_results=total_results,
        source_count=source_count,
    )

    # Opportunity score
    scoring = calculate_opportunity_score(
        scoring
    )

    print(
        "\n[scoring]"
        f"\nSaturation: {scoring['saturation_score']}/100"
        f"\nOpportunity: {scoring['opportunity_score']}/100"
        f"\nVerdict: {scoring['build_verdict']}"
    )

    return {
        "scoring": scoring
    }


# GAP ANALYSIS / FEATURES
def suggest_features(state: AppState):

    prompt = f"""
You are a senior product strategist performing competitive
gap analysis.

User idea:
{state["idea"]}

Competition analysis:
{state["result"]}

Rules:

1. Only discuss products explicitly listed under
DIRECT COMPETITORS.

2. Do NOT treat RELATED PRODUCTS as direct competitors.

3. Do NOT treat IRRELEVANT RESULTS as competitors.

4. If STATUS is NOT_FOUND, say:
"No direct competitors found."

5. Do not invent weaknesses that are not supported by
the competition analysis.

6. When there is insufficient information about a
competitor's weakness, explicitly say:
"Not enough information to determine."

7. Suggest 3-5 concrete differentiating features.

8. Avoid generic suggestions such as:
- Add AI
- Improve UX
- Make it faster
- Better UI

Every suggested feature must address a specific
competitive gap or market pain point.

Use this format:

COMPETITOR GAPS:

- <Competitor>: <specific supported gap>

SUGGESTED DIFFERENTIATORS:

1. <Feature> — addresses: <specific gap or pain point>
2. <Feature> — addresses: <specific gap or pain point>
3. <Feature> — addresses: <specific gap or pain point>
"""

    response = llm.invoke(
        prompt
    )

    features = strip_think(
        response.content
    )

    return {
        "features": features
    }


# LANGGRAPH
workflow = StateGraph(
    AppState
)
workflow.add_node(
    "check_cache",
    check_cache
)
workflow.add_node(
    "generate_query",
    generate_query
)
workflow.add_node(
    "search_products",
    search_products
)
workflow.add_node(
    "compare_products",
    compare_products
)
workflow.add_node(
    "calculate_scores",
    calculate_scores
)

workflow.add_node(
    "suggest_features",
    suggest_features
)

workflow.add_node(
    "save_to_cache",
    save_to_cache
)


# GRAPH EDGES
workflow.add_edge(
    START,
    "check_cache"
)


workflow.add_conditional_edges(
    "check_cache",
    route_after_cache,
    {
        "cached": END,
        "fresh": "generate_query",
    },
)


workflow.add_edge(
    "generate_query",
    "search_products"
)


workflow.add_edge(
    "search_products",
    "compare_products"
)


workflow.add_edge(
    "compare_products",
    "calculate_scores"
)


workflow.add_edge(
    "calculate_scores",
    "suggest_features"
)


workflow.add_edge(
    "suggest_features",
    "save_to_cache"
)


workflow.add_edge(
    "save_to_cache",
    END
)


# COMPILE
graph = workflow.compile()


# GRAPH VISUALIZATION
if __name__ == "__main__":

    png_data = (
        graph
        .get_graph()
        .draw_mermaid_png()
    )

    with open(
        "langgraph_workflow.png",
        "wb"
    ) as f:

        f.write(
            png_data
        )

    print(
        "Graph image saved as langgraph_workflow.png"
    )