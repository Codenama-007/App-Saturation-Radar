from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from database import Base, engine, get_db
from models import User
from schemas import Query, LoginUser, RegisterUser, TokenOut, UserOut
from security import (
    DUMMY_HASH,
    create_access_token,
    get_current_user,
    hash_password,
    verify_password,
)
from graph import graph
from memory import init_db
from streaming import stream_radar
 
load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # create any missing tables on startup
    Base.metadata.create_all(bind=engine)
    yield
 
app = FastAPI(lifespan = lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message" : "This is the actual home route "
    }
    
# a demo route for testing the analysis without scoring
@app.post("/demo_analyze")
def demo_analysis(query : Query):
    print(f"[REQUEST] idea: {query.query}")
 
    result = graph.invoke({
        "idea": query.query,
        "search_query": "",
        "products": [],
        "web_results": [],
        "result": "",
        "features": "",
        "from_cache": False,
    })
 
    print(f"[RESPONSE] result: {result['result']}")
    print(f"[RESPONSE] features: {result['features']}")
    print(f"[RESPONSE] from_cache: {result.get('from_cache')}")
 
    return {
        "response": result["result"],
        "features": result["features"],
        "from_cache": result.get("from_cache", False),
    }

# Creating the Login User Enadpoint
# Log in and get a JWT
@app.post("/login", response_model=TokenOut)
def login(creds: LoginUser, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.email == creds.email))
 
    # always run bcrypt so timing does not reveal whether the email exists
    password_ok = verify_password(
        creds.password, user.password_hash if user else DUMMY_HASH
    )
 
    if user is None or not password_ok:
        raise HTTPException(status_code=401, detail="Invalid email or password")
 
    return {
        "access_token": create_access_token(user.id),
        "token_type": "bearer",
        "user": user,
    }
 
# Creating the register endpoint 
# Register a new user
@app.post("/register", response_model=UserOut, status_code=201)
def register(user: RegisterUser, db: Session = Depends(get_db)):
    taken = db.scalar(
        select(User).where(
            (User.email == user.email)
            | (func.lower(User.username) == user.username.lower())
        )
    )
 
    if taken:
        raise HTTPException(status_code=409, detail="Email or username is already in use")
 
    new_user = User(
        username=user.username,
        email=user.email,
        password_hash=hash_password(user.password),
    )
    db.add(new_user)
 
    try:
        db.commit()
    except IntegrityError:
        # two signups raced past the check above
        db.rollback()
        raise HTTPException(status_code=409, detail="Email or username is already in use")
 
    db.refresh(new_user)
    return new_user

# Returns the signed-in user, used by the frontend to check the token
@app.get("/me", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)):
    return current_user

# the main route for the radar saturation analysis (login required)
@app.post("/radar")
def app_saturation_radar(
    query : Query,
    current_user: User = Depends(get_current_user),
):
    result = graph.invoke(
        {
            "idea": query.query,
            "search_query": "",
            "products": [],
            "web_results": [],
            "result": "",
            "features": "",
            "scoring": {},
            "from_cache": False,
        }
    )

    return {
        "idea": query.query,

        "response": result.get(
            "result",
            ""
        ),

        "features": result.get(
            "features",
            ""
        ),

        "scoring": result.get(
            "scoring",
            {}
        ),

        "from_cache": result.get(
            "from_cache",
            False
        ),
    }

# same analysis as /radar, streamed as newline-delimited JSON (login required)
@app.post("/radar/stream")
def app_saturation_radar_stream(
    query : Query,
    current_user: User = Depends(get_current_user),
):
    return StreamingResponse(
        stream_radar(query.query),
        media_type="application/x-ndjson",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )

# Creating a health route 
@app.get("/health")
def poke():
    return {
        "status": "ok",
        "message": "Saturation Radar API is alive"
    }