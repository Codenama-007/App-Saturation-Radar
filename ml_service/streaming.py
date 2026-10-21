import json
from typing import Iterator

from chats import save_turn
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


def stream_radar(idea: str, user_id: int, chat_id: int | None = None) -> Iterator[str]:
    """Run the graph, yield one JSON event per line, and save the answer at the end."""
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
    # the finished text of each part, kept so it can be saved once the run is done
    collected = {"response": "", "features": "", "scoring": {}}

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
                    collected["response"] = update.get("result", "")
                    collected["features"] = update.get("features", "")
                    yield _line({"type": "text", "field": "response", "text": collected["response"]})
                    yield _line({"type": "text", "field": "features", "text": collected["features"]})

                # the finished node output replaces the streamed text, minus any <think> blocks
                elif node == "compare_products":
                    collected["response"] = update.get("result", "")
                    yield _line({"type": "text", "field": "response", "text": collected["response"]})

                elif node == "suggest_features":
                    collected["features"] = update.get("features", "")
                    yield _line({"type": "text", "field": "features", "text": collected["features"]})

                elif node == "calculate_scores":
                    collected["scoring"] = update.get("scoring", {})
                    yield _line({"type": "scoring", "data": collected["scoring"]})

    except Exception as error:
        # the HTTP status is already 200 here, so the error travels as an event
        # a failed analysis is not saved
        print(f"[stream error] {error}")
        yield _line({"type": "error", "detail": _error_detail(error)})
        return

    saved_chat_id = None

    try:
        if collected["response"]:
            saved_chat_id = save_turn(
                user_id=user_id,
                chat_id=chat_id,
                question=idea,
                response=collected["response"],
                features=collected["features"],
                scoring=collected["scoring"],
                from_cache=from_cache,
            )
    except Exception as error:
        # the answer was shown, so tell the page it was not saved instead of failing
        print(f"[save error] {error}")

    yield _line(
        {
            "type": "done",
            "idea": idea,
            "from_cache": from_cache,
            "chat_id": saved_chat_id,
            "saved": saved_chat_id is not None,
        }
    )