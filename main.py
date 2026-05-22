from fastapi import FastAPI

from controllers.fazendas import router_fazendas
from controllers.talhoes import router_talhoes
from controllers.maquinas import router_maquinas
from controllers.operadores import router_operadores

app = FastAPI()


app.include_router(router_fazendas)
app.include_router(router_talhoes)
app.include_router(router_maquinas)
app.include_router(router_operadores)
