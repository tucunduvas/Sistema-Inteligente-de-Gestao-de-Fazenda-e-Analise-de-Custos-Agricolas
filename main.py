from fastapi import FastAPI
from controllers.auth_routes import router_auth
from controllers.fazendas import router_fazendas
from controllers.maquinas import router_maquinas
from controllers.operadores import router_operadores
from controllers.culturas import router_culturas
from controllers.insumos import router_defensivos
from controllers.insumos import router_sementes
from controllers.insumos import router_fertilizantes
from controllers.atividadesagricolas import router_atividades

app = FastAPI()

app.include_router(router_fazendas)
app.include_router(router_maquinas)
app.include_router(router_operadores)
app.include_router(router_culturas)
app.include_router(router_fertilizantes)
app.include_router(router_defensivos)
app.include_router(router_sementes)
app.include_router(router_atividades)
app.include_router(router_auth)

