from fastapi import APIRouter, Query
from typing import List, Optional
from app.data.profissionais_mockados import profissionais
from app.models.profissional import Profissional

router = APIRouter()

@router.get(
    "/buscar",
    response_model=List[Profissional],
    summary="Busca profissionais por categoria e/ou termo",
)
def buscar_profissionais(
    termo: Optional[str] = Query(None, description="Texto livre para busca no nome"),
    categoria: Optional[str] = Query(None, description="Filtra por categoria exata"),
):
    resultados = profissionais
    if categoria:
        resultados = [p for p in resultados if p.categoria.lower() == categoria.lower()]
    if termo:
        resultados = [p for p in resultados if termo.lower() in p.nome.lower()]
    # Ordena por avaliação (descendente)
    resultados.sort(key=lambda p: p.avaliacao, reverse=True)
    return resultados