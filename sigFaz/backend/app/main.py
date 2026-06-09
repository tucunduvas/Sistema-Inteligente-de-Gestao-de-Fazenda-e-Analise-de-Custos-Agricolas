from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.controllers.auth_routes import router_auth
from app.controllers.fazendas import router_fazendas
from app.controllers.maquinas import router_maquinas
from app.controllers.operadores import router_operadores
from app.controllers.culturas import router_culturas
from app.controllers.custos import router_custos
from app.controllers.dashboards import router_dashboard
from app.controllers.producao import router_producao
from app.controllers.relatorios import router_relatorios
from app.controllers.talhoes import router_talhoes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_auth)
app.include_router(router_fazendas)
app.include_router(router_maquinas)
app.include_router(router_operadores)
app.include_router(router_culturas)
app.include_router(router_custos)
app.include_router(router_dashboard)
app.include_router(router_producao)
app.include_router(router_relatorios)
app.include_router(router_talhoes)


@app.get('/')
def home():
    return {
        'mensagem': 'API funcionando'
    }
