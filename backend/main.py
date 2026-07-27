import os
import sys

# Ensure root workspace directory is in sys.path for backend package resolution
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api.chat import router as chat_router
from backend.app.routers.documents import router as documents_router
from backend.app.routers.translation import router as translation_router
from backend.app.api.assistant import router as assistant_router
from backend.app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(chat_router, prefix="/api")
app.include_router(documents_router, prefix="/api")
app.include_router(translation_router, prefix="/api")
app.include_router(assistant_router, prefix="/api/assistant")

@app.get("/")
def read_root():
    return {"message": "JanMitra AI Assistant API is running"}
