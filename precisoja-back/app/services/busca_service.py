from openai import OpenAI
import os

from app.models.profissional_model import Profissional
from app.models.requisicao_busca import RequisicaoBusca
from app.utils.similaridade import calcular_afinidade
from app.data.profissionais_mockados import mock_profissionais

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def obter_categorias_ia(texto_usuario: str) -> list:
    prompt = f"""
    O usuário digitou: "{texto_usuario}".
    Classifique esse pedido em até 3 categorias principais de serviços como: encanador, técnico de geladeira, eletricista, designer, professor particular, etc.
    Responda com uma lista simples de nomes de categorias, como: ["Técnico em Refrigeração", "Eletricista"]
    """

    resposta = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.4,
        max_tokens=100
    )

    conteudo = resposta.choices[0].message.content.strip()

    try:
        categorias = eval(conteudo) if conteudo.startswith("[") else [conteudo]
    except Exception:
        categorias = [conteudo]

    return categorias

def buscar_profissionais(texto_usuario: str) -> list:
    categorias = obter_categorias_ia(texto_usuario)

    profissionais_relevantes = [
        prof for prof in mock_profissionais if prof["categoria"] in categorias
    ]

    profissionais_ordenados = sorted(
        profissionais_relevantes,
        key=lambda p: (-categorias.index(p["categoria"]), -p["avaliacao"])
    )

    return profissionais_ordenados
