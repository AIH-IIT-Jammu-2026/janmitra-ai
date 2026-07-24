import os
from pydantic import BaseModel

try:
    from dotenv import load_dotenv
    # Attempt to load .env from backend root or working directory
    load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", "..", ".env"))
except ModuleNotFoundError:
    pass

try:
    from dotenv import load_dotenv
    # Attempt to load .env from backend root or working directory
    load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", "..", ".env"))
except ModuleNotFoundError:
    pass

class Settings(BaseModel):
    PROJECT_NAME: str = "JanMitra AI Backend"
    API_V1_STR: str = "/api"
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")

settings = Settings()