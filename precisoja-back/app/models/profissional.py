from pydantic import BaseModel

class Profissional(BaseModel):
    id: int
    nome: str
    categoria: str
    avaliacao: float