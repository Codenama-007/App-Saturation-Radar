from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import Query 
from dotenv import load_dotenv

from graph import graph
from memory import init_db

load_dotenv()

app = FastAPI()

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

# the main route for the radar saturation analysis
@app.post("/radar")
def app_saturation_radar(query : Query):
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
    
# Creating a health route 
@app.get("/health")
def poke():
    return {
        "status": "ok",
        "message": "Saturation Radar API is alive"
    }