import json
from typing import Iterator

from graph import content_to_text, graph

# nodes whose LLM tokens are shown to the user, mapped to the field they fill
STREAMED_NODES = {
    "compare_products": "response",
    "suggest_features": "features",
}


def _line(event: dict) -> str:
    return json.dumps(event) + "\n"


def _error_detail(error: Exception) -> str:
    message = str(error).lower()

    if "connect" in message or "503" in message or "unavailable" in message:
        return "The AI model is unavailable. Check that Ollama is running."

    return "Analysis failed. Please try again."


def stream_radar(idea: str) -> Iterator[str]:
    """Run the graph and yield one JSON event per line."""
    state = {
        "idea": idea,
        "search_query": "",
        "products": [],
        "web_results": [],
        "result": "",
        "features": "",
        "scoring": {},
        "from_cache": False,
    }
    from_cache = False

    yield _line({"type": "start", "idea": idea})

    try:
        for mode, chunk in graph.stream(state, stream_mode=["updates", "messages"]):
            if mode == "messages":
                message, meta = chunk
                field = STREAMED_NODES.get(meta.get("langgraph_node"))
                text = content_to_text(message.content)

                if field and text:
                    yield _line({"type": "token", "field": field, "text": text})
                continue

            for node, update in chunk.items():
                update = update or {}
                yield _line({"type": "step", "node": node})

                # a cache hit returns the saved text in one piece
                if node == "check_cache" and update.get("from_cache"):
                    from_cache = True
                    yield _line({"type": "text", "field": "response", "text": update.get("result", "")})
                    yield _line({"type": "text", "field": "features", "text": update.get("features", "")})

                # the finished node output replaces the streamed text, minus any <think> blocks
                elif node == "compare_products":
                    yield _line({"type": "text", "field": "response", "text": update.get("result", "")})

                elif node == "suggest_features":
                    yield _line({"type": "text", "field": "features", "text": update.get("features", "")})

                elif node == "calculate_scores":
                    yield _line({"type": "scoring", "data": update.get("scoring", {})})

        yield _line({"type": "done", "idea": idea, "from_cache": from_cache})

    except Exception as error:
        # the HTTP status is already 200 here, so the error travels as an event
        print(f"[stream error] {error}")
        yield _line({"type": "error", "detail": _error_detail(error)})