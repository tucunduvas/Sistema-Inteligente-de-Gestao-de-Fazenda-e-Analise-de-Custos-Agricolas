from fastapi import APIRouter, HTTPException
from db import conectar

router_lucro = APIRouter(
    prefix="/lucro",
    tags=["Lucro"]
)


@router_lucro.get("/")
def obter_resumo_lucro():
    conn = conectar()

    try:
        with conn.cursor() as cursor:

            cursor.execute("""
                SELECT COALESCE(SUM(quantidade * valor_unitario), 0)
                FROM producoes
            """)
            total_receitas = float(cursor.fetchone()[0])

            cursor.execute("""
                SELECT COALESCE(SUM(valor), 0)
                FROM custos
            """)
            total_custos = float(cursor.fetchone()[0])

        lucro_liquido = total_receitas - total_custos

        margem_lucro = (
            round((lucro_liquido / total_receitas) * 100, 1)
            if total_receitas > 0
            else 0
        )

        return {
            "total_receitas": total_receitas,
            "total_custos": total_custos,
            "lucro_liquido": lucro_liquido,
            "margem_lucro": margem_lucro,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao calcular lucro: {e}"
        )

    finally:
        conn.close()