from fastapi import APIRouter
from db import conectar

router_relatorios = APIRouter(
    prefix="/relatorios",
    tags=["Relatórios"]
)

@router_relatorios.get("/produtividade")
def relatorio_produtividade():

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT cultura,
               SUM(quantidade)
        FROM Colheita
        GROUP BY cultura
    """)

    dados = cursor.fetchall()

    cursor.close()
    conn.close()

    return dados


@router_relatorios.get("/custos")
def relatorio_custos():

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT nome,
               tipo,
               custo,
               quantidade
        FROM Insumo
    """)

    dados = cursor.fetchall()

    cursor.close()
    conn.close()

    return dados