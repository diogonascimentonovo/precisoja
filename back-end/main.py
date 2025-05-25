from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Permite que o frontend se comunique com esse backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, troque por ['https://seusite.com']
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de dados esperado no corpo da requisição
class TextoBusca(BaseModel):
    texto: str

@app.post("/api/recomendar-servicos")
async def recomendar_servicos(body: TextoBusca):
    print(f"Usuário digitou: {body.texto}")
    return {
        "status": "recebido",
        "texto_original": body.texto,
        "exemplo_resposta": ["Consultoria Empresarial", "Financeiro e Contábil"]
    }
#novatentativadedeploy