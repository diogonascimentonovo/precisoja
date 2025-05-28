from pydantic import BaseModel

class BuscaRequest(BaseModel):
    texto: str

class ProfissionalResposta(BaseModel):
    id: int
    nome: str
    categoria: str
    especialidade: str
    avaliacao: float
