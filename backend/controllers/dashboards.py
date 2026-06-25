from fastapi import APIRouter
from db import conectar

router_dashboard = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router_dashboard.get("/")
def visualizar_dashboard():

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM Fazenda")
    fazendas = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM Talhao")
    talhoes = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM Maquina")
    maquinas = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM Operador")
    operadores = cursor.fetchone()[0]

    cursor.close()
    conn.close()

    return {
        "fazendas": fazendas,
        "talhoes": talhoes,
        "maquinas": maquinas,
        "operadores": operadores
    }