from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from controllers.fazendas import router_fazendas
from controllers.talhoes import router_talhoes
from controllers.maquinas import router_maquinas
from controllers.operadores import router_operadores
from controllers.auth_routes import router_auth
from controllers.culturas import router_culturas
from controllers.plantios import router_plantios
from controllers.colheitas import router_colheitas
from controllers.insumos import router_insumos
from controllers.dashboards import router_dashboard
from controllers.relatorios import router_relatorios
from controllers.atividadesagricolas import router_atividades
from controllers.custos import router_custos
from controllers.producao import router_producao

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_fazendas)
app.include_router(router_talhoes)
app.include_router(router_maquinas)
app.include_router(router_operadores)
app.include_router(router_auth)
app.include_router(router_culturas)
app.include_router(router_plantios)
app.include_router(router_colheitas)
app.include_router(router_insumos)
app.include_router(router_dashboard)
app.include_router(router_relatorios)
app.include_router(router_atividades)
app.include_router(router_custos)
app.include_router(router_producao)

