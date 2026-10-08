from pydantic import BaseModel , EmailStr
from typing import List , Dict , TypedDict 



class Query(BaseModel):
    query : str
    
    
class AppState(TypedDict):
    idea: str
    search_query: str          # User's Query
    products: List[Dict]       # from Product Hunt
    web_results: List[Dict]    # from DuckDuckGo
    result: str                # total results from product hunt and DuckDuckGo
    features: str               # gap analysis + suggestions
    scoring: Dict
    from_cache: bool
    
class LoginUser(BaseModel):
    email : EmailStr
    password : str

class RegisterUser(BaseModel):
    username : str
    email : EmailStr
    password : str