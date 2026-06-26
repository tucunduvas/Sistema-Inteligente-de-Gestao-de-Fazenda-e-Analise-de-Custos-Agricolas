from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse


from routers.talhoes import router_talhoes
from routers.maquinas import router_maquinas
from routers.culturas import router_culturas
from routers.custos import router_custos
from routers.lucro import router_lucro
from routers.dashboards import router_dashboard
from routers.producao import router_producao
from routers.auth_routes import router_auth
from routers.atividades import router_atividades
from routers.insumos import router_insumos


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
app.include_router(router_talhoes)
app.include_router(router_maquinas)
app.include_router(router_culturas)
app.include_router(router_custos)
app.include_router(router_dashboard)
app.include_router(router_producao)
app.include_router(router_atividades)
app.include_router(router_insumos)
app.include_router(router_lucro)