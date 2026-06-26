from fastapi import APIRouter, HTTPException, status
from psycopg2.extras import RealDictCursor

from db import conectar
from models.model import Atividade

router_atividades = APIRouter(
    prefix="/atividades",
    tags=["Atividades"]
)


@router_atividades.post("/", status_code=status.HTTP_201_CREATED)
def cadastrar_atividade(atividade: Atividade):
    conn = conectar()

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:

            sql = """
                INSERT INTO atividade
                (tipo, data, talhao, descricao)
                VALUES (%s, %s, %s, %s)
                RETURNING id, tipo, data, talhao, descricao
            """

            valores = (
                atividade.tipo,
                atividade.data,
                atividade.talhao,
                atividade.descricao,
            )

            cursor.execute(sql, valores)

            nova_atividade = cursor.fetchone()

            conn.commit()

        return nova_atividade

    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao cadastrar: {e}"
        )

    finally:
        conn.close()


@router_atividades.get("/")
def listar_atividades():
    conn = conectar()

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:

            cursor.execute("""
                SELECT
                    id,
                    tipo,
                    data,
                    talhao,
                    descricao
                FROM atividade
                ORDER BY data DESC
            """)

            return cursor.fetchall()

    finally:
        conn.close()


@router_atividades.put("/{id}")
def atualizar_atividade(id: int, atividade: Atividade):
    conn = conectar()

    try:
        with conn.cursor() as cursor:

            sql = """
                UPDATE atividade
                SET
                    tipo=%s,
                    data=%s,
                    talhao=%s,
                    descricao=%s
                WHERE id=%s
            """

            valores = (
                atividade.tipo,
                atividade.data,
                atividade.talhao,
                atividade.descricao,
                id,
            )

            cursor.execute(sql, valores)

            if cursor.rowcount == 0:
                conn.rollback()
                raise HTTPException(
                    status_code=404,
                    detail="Atividade não encontrada"
                )

            conn.commit()

        return {"mensagem": "Atividade atualizada"}

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


@router_atividades.delete("/{id}")
def deletar_atividade(id: int):
    conn = conectar()

    try:
        with conn.cursor() as cursor:

            cursor.execute(
                "DELETE FROM atividade WHERE id=%s",
                (id,)
            )

            if cursor.rowcount == 0:
                conn.rollback()
                raise HTTPException(
                    status_code=404,
                    detail="Atividade não encontrada"
                )

            conn.commit()

        return {"mensagem": "Atividade deletada"}

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