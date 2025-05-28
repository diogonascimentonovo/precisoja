from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router

app = FastAPI(
    title="PrecisoJá API",
    description="API de busca de profissionais mockados",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
    "https://precisoja.netlify.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/ping", summary="Verifica se o servidor está vivo")
def ping():
    return {"ping": "pong"}
