from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from database import SessionLocal, get_db
from models import Chat, ChatTurn, User
from schemas import ChatDetail, ChatRename, ChatSummary
from security import get_current_user

router = APIRouter(prefix="/chats", tags=["chats"])

TITLE_LENGTH = 50


def make_title(question: str) -> str:
    text = " ".join(question.split())

    if not text:
        return "New chat"

    if len(text) <= TITLE_LENGTH:
        return text

    return text[:TITLE_LENGTH].rstrip() + "…"


def get_owned_chat(db: Session, chat_id: int, user_id: int, with_turns: bool = False) -> Chat:
    stmt = select(Chat).where(Chat.id == chat_id, Chat.user_id == user_id)

    if with_turns:
        stmt = stmt.options(selectinload(Chat.turns))

    chat = db.scalar(stmt)

    # a chat that belongs to someone else looks exactly like one that does not exist
    if chat is None:
        raise HTTPException(status_code=404, detail="Chat not found")

    return chat


def save_turn(
    user_id: int,
    chat_id: int | None,
    question: str,
    response: str,
    features: str,
    scoring: dict,
    from_cache: bool,
) -> int:
    """Save one answer and return the chat id, creating the chat if needed."""
    # own session, because the request session may be closed while streaming
    with SessionLocal() as db:
        chat = None

        if chat_id is not None:
            chat = db.scalar(select(Chat).where(Chat.id == chat_id, Chat.user_id == user_id))

        # the chat was deleted mid-stream, so start a new one instead of losing the answer
        if chat is None:
            chat = Chat(user_id=user_id, title=make_title(question))
            db.add(chat)

        chat.turns.append(
            ChatTurn(
                question=question,
                response=response,
                features=features,
                scoring=scoring,
                from_cache=from_cache,
            )
        )
        chat.updated_at = datetime.now(timezone.utc)

        db.commit()
        return chat.id


@router.get("", response_model=list[ChatSummary])
def list_chats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    stmt = (
        select(Chat)
        .where(Chat.user_id == current_user.id)
        .order_by(Chat.updated_at.desc(), Chat.id.desc())
    )
    return db.scalars(stmt).all()


@router.get("/{chat_id}", response_model=ChatDetail)
def read_chat(
    chat_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_owned_chat(db, chat_id, current_user.id, with_turns=True)


@router.patch("/{chat_id}", response_model=ChatSummary)
def rename_chat(
    chat_id: int,
    body: ChatRename,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    chat = get_owned_chat(db, chat_id, current_user.id)
    chat.title = body.title
    db.commit()
    db.refresh(chat)
    return chat


@router.delete("/{chat_id}", status_code=204)
def delete_chat(
    chat_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    chat = get_owned_chat(db, chat_id, current_user.id)
    db.delete(chat)
    db.commit()
    return Response(status_code=204)