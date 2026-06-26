from fastapi import APIRouter, HTTPException, status
from psycopg2.extras import RealDictCursor
from models.model import Producao
from db import conectar

router_producao = APIRouter(
    prefix="/producao",
    tags=["Produção"]
)


@router_producao.post("/", status_code=status.HTTP_201_CREATED)
def cadastrar_producao(producao: Producao):
    conn = conectar()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            sql = """
                INSERT INTO producoes
                (cultura, talhao, quantidade, unidade, valor_unitario, data)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id, cultura, talhao, quantidade, unidade, valor_unitario, data
            """

            valores = (
                producao.cultura,
                producao.talhao,
                producao.quantidade,
                producao.unidade,
                producao.valor_unitario,
                producao.data,
            )

            cursor.execute(sql, valores)
            nova_producao = cursor.fetchone()

            conn.commit()

        return nova_producao

    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao cadastrar: {e}"
        )

    finally:
        conn.close()


@router_producao.get("/")
def listar_producao():
    conn = conectar()

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("""
                SELECT
                    id,
                    cultura,
                    talhao,
                    quantidade,
                    unidade,
                    valor_unitario,
                    data
                FROM producoes
                ORDER BY data DESC
            """)

            return cursor.fetchall()

    finally:
        conn.close()


@router_producao.put("/{id}")
def atualizar_producao(id: int, producao: Producao):
    conn = conectar()

    try:
        with conn.cursor() as cursor:
            sql = """
                UPDATE producoes
                SET
                    cultura=%s,
                    talhao=%s,
                    quantidade=%s,
                    unidade=%s,
                    valor_unitario=%s,
                    data=%s
                WHERE id=%s
            """

            valores = (
                producao.cultura,
                producao.talhao,
                producao.quantidade,
                producao.unidade,
                producao.valor_unitario,
                producao.data,
                id,
            )

            cursor.execute(sql, valores)

            if cursor.rowcount == 0:
                conn.rollback()
                raise HTTPException(
                    status_code=404,
                    detail="Produção não encontrada"
                )

            conn.commit()

        return {"mensagem": "Produção atualizada"}

    except HTTPException:
        raise

    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao atualizar: {e}"
        )

    finally:
        conn.close()


@router_producao.delete("/{id}")
def deletar_producao(id: int):
    conn = conectar()

    try:
        with conn.cursor() as cursor:
            cursor.execute(
                "DELETE FROM producoes WHERE id=%s",
                (id,)
            )

            if cursor.rowcount == 0:
                conn.rollback()
                raise HTTPException(
                    status_code=404,
                    detail="Produção não encontrada"
                )

            conn.commit()

        return {"mensagem": "Produção deletada"}

    except HTTPException:
        raise

    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao deletar: {e}"
        )

    finally:
        conn.close()