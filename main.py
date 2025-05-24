from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Libera o frontend para se comunicar com o backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou especifique seu domínio
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo do corpo da requisição
class TextoBusca(BaseModel):
    texto: str

@app.post("/api/recomendar-servicos")
async def recomendar_servicos(body: TextoBusca):
    print(f"Usuário buscou por: {body.texto}")
    return {"status": "recebido", "eco": body.texto}
