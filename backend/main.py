from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from controllers.fazendas import router_fazendas
from controllers.talhoes import router_talhoes
from controllers.maquinas import router_maquinas
from controllers.operadores import router_operadores
from controllers.culturas import router_culturas
from controllers.custos import router_custos
from controllers.dashboards import router_dashboard
from controllers.producao import router_producao
from controllers.relatorios import router_relatorios
from controllers.auth_routes import router_auth
# from controllers.atividadesagricolas import router_atividades
from controllers.insumos import router_insumos


app = FastAPI(
    title="API Gestão Agrícola",
    description="API para gestão de fazendas, talhões, máquinas, insumos e produção",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Status"])
def status():
    return {"status": "online"}

@app.exception_handler(Exception)
def erro_inesperado(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": f"Erro interno: {str(exc)}"},
    )


app.include_router(router_auth)
app.include_router(router_fazendas)
app.include_router(router_talhoes)
app.include_router(router_maquinas)
app.include_router(router_operadores)
app.include_router(router_culturas)
app.include_router(router_custos)
app.include_router(router_dashboard)
app.include_router(router_producao)
app.include_router(router_relatorios)
# app.include_router(router_atividades)
app.include_router(router_insumos)