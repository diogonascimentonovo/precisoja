from fastapi import APIRouter
from app.api.v1.routes_busca import router as busca_router

router = APIRouter()
router.include_router(busca_router, prefix="", tags=["busca"])