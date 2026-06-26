from fastapi import APIRouter, HTTPException, status
from psycopg2.extras import RealDictCursor
from models.model import Custo
from db import conectar

router_custos = APIRouter(
    prefix="/custos",
    tags=["Custos"]
)


@router_custos.post("/", status_code=status.HTTP_201_CREATED)
def cadastrar_custo(custo: Custo):
    conn = conectar()

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            sql = """
                INSERT INTO custos
                (categoria, descricao, valor, data)
                VALUES (%s, %s, %s, %s)
                RETURNING id, categoria, descricao, valor, data
            """

            valores = (
                custo.categoria,
                custo.descricao,
                custo.valor,
                custo.data,
            )

            cursor.execute(sql, valores)
            novo_custo = cursor.fetchone()

            conn.commit()

        return novo_custo

    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao cadastrar: {e}"
        )

    finally:
        conn.close()


@router_custos.get("/")
def listar_custos():
    conn = conectar()

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("""
                SELECT
                    id,
                    categoria,
                    descricao,
                    valor,
                    data
                FROM custos
                ORDER BY data DESC
            """)

            return cursor.fetchall()

    finally:
        conn.close()


@router_custos.put("/{id}")
def atualizar_custo(id: int, custo: Custo):
    conn = conectar()

    try:
        with conn.cursor() as cursor:
            sql = """
                UPDATE custos
                SET
                    categoria=%s,
                    descricao=%s,
                    valor=%s,
                    data=%s
                WHERE id=%s
            """

            valores = (
                custo.categoria,
                custo.descricao,
                custo.valor,
                custo.data,
                id,
            )

            cursor.execute(sql, valores)

            if cursor.rowcount == 0:
                conn.rollback()
                raise HTTPException(
                    status_code=404,
                    detail="Custo não encontrado"
                )

            conn.commit()

        return {"mensagem": "Custo atualizado"}

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


@router_custos.delete("/{id}")
def deletar_custo(id: int):
    conn = conectar()

    try:
        with conn.cursor() as cursor:
            cursor.execute(
                "DELETE FROM custos WHERE id=%s",
                (id,)
            )

            if cursor.rowcount == 0:
                conn.rollback()
                raise HTTPException(
                    status_code=404,
                    detail="Custo não encontrado"
                )

            conn.commit()

        return {"mensagem": "Custo deletado"}

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