# --- PRODUCT HUNT DISABLED ---------------------------------------------------
# Product Hunt's API has no real full-text search, so it returned trending
# launches unrelated to the idea. Keep the import commented out for now.
# from tools import Search_For_the_product, search_web_for_idea
# -----------------------------------------------------------------------------
import os
import re
from langgraph.graph import START, END, StateGraph
from langchain_ollama import ChatOllama
from tools import search_web_for_idea
from schemas import AppState
from memory import find_similar_idea, save_idea
from scoring import (
    calculate_saturation_score,
    calculate_opportunity_score,
)

# LLM (Ollama only, fully local)
# Pick any model shown by `ollama list`, e.g.:
#   $env:OLLAMA_MODEL="llama3.1:8b"
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2:3b")

llm = ChatOllama(
    model=OLLAMA_MODEL,
    temperature=0,
    # Ollama's default context window is small. Prompts here include web
    # search results, so a larger window avoids silent truncation.
    num_ctx=int(os.getenv("OLLAMA_NUM_CTX", "8192")),
    # Local models are slow. Give each call plenty of time.
    client_kwargs={"timeout": float(os.getenv("OLLAMA_TIMEOUT", "300"))},
)

print(f"[llm] Ollama model: {OLLAMA_MODEL}")


# HELPERS
def content_to_text(content) -> str:
    """
    Normalize LangChain message content to a plain string.

    Newer Gemini models return a list of content blocks, e.g.
    [{"type": "text", "text": "..."}], instead of a string.
    Non-text blocks (thinking / reasoning) are skipped.
    """
    if isinstance(content, str):
        return content

    if isinstance(content, list):
        parts = []
        for block in content:
            if isinstance(block, str):
                parts.append(block)
            elif isinstance(block, dict) and block.get("type") == "text":
                parts.append(block.get("text", ""))
        return "".join(parts)

    return str(content)


def strip_think(text) -> str:
    """
    Remove <think>...</think> blocks if the model produces them.
    Accepts a string or LangChain content (list of blocks).
    """
    text = content_to_text(text)

    return re.sub(
        r"<think>.*?</think>",
        "",
        text,
        flags=re.DOTALL,
    ).strip()


def extract_integer(text) -> int:
    """
    Extract the first integer from an LLM response.
    """
    match = re.search(r"\d+", content_to_text(text))

    if not match:
        return 0

    return int(match.group())


def count_direct_competitors(analysis: str) -> int:
    """
    Count numbered items under "DIRECT COMPETITORS:" directly from the text.
    Small local models are unreliable at counting, so this avoids an LLM call.
    """
    m = re.search(
        r"DIRECT COMPETITORS:?(.*?)(?:RELATED PRODUCTS|IRRELEVANT RESULTS|$)",
        analysis,
        flags=re.DOTALL | re.IGNORECASE,
    )

    if not m:
        return 0

    section = m.group(1).strip()

    if re.match(r"none\b", section, flags=re.IGNORECASE):
        return 0

    return len(
        re.findall(r"^\s*\d+[.)]\s+\S", section, flags=re.MULTILINE)
    )


# CACHE
def check_cache(state: AppState):

    match, score = find_similar_idea(state["idea"])

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

    return {"from_cache": False}


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
Do not narrow the idea to a specific niche the user did not mention.

Return ONLY the search query.
Do not explain your answer.
"""

    response = llm.invoke(prompt)

    query = strip_think(response.content)

    return {"search_query": query}


# SEARCH
def search_products(state: AppState):

    query = state["search_query"]

    print(f"[research] Searching for: {query}")

    web_results = search_web_for_idea(query)

    # --- PRODUCT HUNT DISABLED -----------------------------------------------
    # try:
    #     products = Search_For_the_product(query)
    # except RuntimeError as e:
    #     print(f"[warning] Product Hunt search failed: {e}")
    #     products = []
    products = []
    # -------------------------------------------------------------------------

    return {
        "web_results": web_results,
        "products": products,
    }


# COMPETITOR ANALYSIS
def compare_products(state: AppState):

    # --- PRODUCT HUNT DISABLED: removed the "Product Hunt results" block ------
    # Product Hunt results:
    # {state["products"]}
    # -------------------------------------------------------------------------

    prompt = f"""
You are a startup competition analyst.

User's startup idea:
{state["idea"]}

Web search results:
{state["web_results"]}

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

    analysis = strip_think(result.content)

    return {"result": analysis}


# SCORING
def calculate_scores(state: AppState):

    analysis = state["result"]

    # Count direct competitors (parsed from text, no LLM call)
    direct_competitors = count_direct_competitors(analysis)

    # Count highly similar competitors (only worth asking if there are any)
    high_similarity = 0

    if direct_competitors > 0:
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

        similarity_response = llm.invoke(similarity_prompt)

        high_similarity = extract_integer(
            strip_think(similarity_response.content)
        )

        # A small model can over-count; never exceed the competitor total
        high_similarity = min(high_similarity, direct_competitors)

    # Research result counts
    web_results = state.get("web_results", [])
    products = state.get("products", [])  # empty while Product Hunt is disabled

    total_results = len(web_results) + len(products)

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
    scoring = calculate_opportunity_score(scoring)

    print(
        "\n[scoring]"
        f"\nSaturation: {scoring['saturation_score']}/100"
        f"\nOpportunity: {scoring['opportunity_score']}/100"
        f"\nVerdict: {scoring['build_verdict']}"
    )

    return {"scoring": scoring}


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

    response = llm.invoke(prompt)

    features = strip_think(response.content)

    return {"features": features}


# LANGGRAPH
workflow = StateGraph(AppState)

workflow.add_node("check_cache", check_cache)
workflow.add_node("generate_query", generate_query)
workflow.add_node("search_products", search_products)
workflow.add_node("compare_products", compare_products)
workflow.add_node("calculate_scores", calculate_scores)
workflow.add_node("suggest_features", suggest_features)
workflow.add_node("save_to_cache", save_to_cache)


# GRAPH EDGES
workflow.add_edge(START, "check_cache")

workflow.add_conditional_edges(
    "check_cache",
    route_after_cache,
    {
        "cached": END,
        "fresh": "generate_query",
    },
)

workflow.add_edge("generate_query", "search_products")
workflow.add_edge("search_products", "compare_products")
workflow.add_edge("compare_products", "calculate_scores")
workflow.add_edge("calculate_scores", "suggest_features")
workflow.add_edge("suggest_features", "save_to_cache")
workflow.add_edge("save_to_cache", END)


# COMPILE
graph = workflow.compile()


# GRAPH VISUALIZATION
if __name__ == "__main__":

    png_data = graph.get_graph().draw_mermaid_png()

    with open("langgraph_workflow.png", "wb") as f:
        f.write(png_data)

    print("Graph image saved as langgraph_workflow.png")