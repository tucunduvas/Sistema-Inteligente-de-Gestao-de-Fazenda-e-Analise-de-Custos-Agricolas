from fastapi import APIRouter, HTTPException
from db import conectar

router_dashboard = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router_dashboard.get("/")
def obter_dashboard():

    conn = conectar()

    try:
        with conn.cursor() as cursor:

            # Culturas
            cursor.execute("SELECT COUNT(*) FROM cultura")
            total_culturas = cursor.fetchone()[0]

            # Máquinas
            cursor.execute("SELECT COUNT(*) FROM maquina")
            total_maquinas = cursor.fetchone()[0]

            # Atividades
            cursor.execute("SELECT COUNT(*) FROM atividade")
            total_atividades = cursor.fetchone()[0]

            # Produções
            cursor.execute("SELECT COUNT(*) FROM producoes")
            total_producoes = cursor.fetchone()[0]

            # Custos
            cursor.execute("SELECT COUNT(*) FROM custos")
            total_custos_registros = cursor.fetchone()[0]

            # Receita
            cursor.execute("""
                SELECT COALESCE(SUM(quantidade * valor_unitario),0)
                FROM producoes
            """)
            receita_total = float(cursor.fetchone()[0])

            # Custos
            cursor.execute("""
                SELECT COALESCE(SUM(valor),0)
                FROM custos
            """)
            custo_total = float(cursor.fetchone()[0])

        lucro_liquido = receita_total - custo_total

        margem_lucro = (
            round((lucro_liquido / receita_total) * 100, 1)
            if receita_total > 0
            else 0
        )

        return {

            "resumo": {
                "culturas": total_culturas,
                "maquinas": total_maquinas,
                "atividades": total_atividades,
                "producoes": total_producoes,
                "custos": total_custos_registros
            },

            "financeiro": {
                "receita_total": receita_total,
                "custo_total": custo_total,
                "lucro_liquido": lucro_liquido,
                "margem_lucro": margem_lucro
            }

        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Erro ao carregar dashboard: {e}"
        )

    finally:
        conn.close()