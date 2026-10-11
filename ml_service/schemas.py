from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from typing import List, Dict, TypedDict



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
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)
 
    @field_validator("email")
    @classmethod
    def lowercase_email(cls, value: str) -> str:
        return value.lower()
 
 
class RegisterUser(BaseModel):
    username: str = Field(pattern=r"^[A-Za-z0-9_]{3,30}$")
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)
 
    @field_validator("email")
    @classmethod
    def lowercase_email(cls, value: str) -> str:
        return value.lower()
 
    @field_validator("password")
    @classmethod
    def fits_bcrypt(cls, value: str) -> str:
        # bcrypt only reads the first 72 bytes
        if len(value.encode("utf-8")) > 72:
            raise ValueError("Password must be at most 72 bytes")
        return value
 
 
class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
 
    id: int
    username: str
    email: str
 
 
class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut