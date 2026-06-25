from fastapi import APIRouter, HTTPException, status
from psycopg2.extras import RealDictCursor
from models.model import Cultura
from db import conectar

router_culturas = APIRouter(
    prefix="/culturas",
    tags=["Cultura"]
)


@router_culturas.post('/', status_code=status.HTTP_201_CREATED)
def cadastrar_cultura(cultura: Cultura):
    conn = conectar()
    try:
        with conn.cursor() as cursor:
            sql = """
                INSERT INTO cultura (nome, tipo, ciclo_dias)
                VALUES (%s, %s, %s)
                RETURNING id
            """
            valores = (cultura.nome, cultura.tipo, cultura.ciclo_dias)
            cursor.execute(sql, valores)
            novo_id = cursor.fetchone()[0]
            conn.commit()
        return {"mensagem": "Cultura cadastrada", "id": novo_id}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao cadastrar: {e}")
    finally:
        conn.close()


@router_culturas.get('/')
def listar_culturas():
    conn = conectar()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("SELECT id, nome, tipo, ciclo_dias FROM cultura")
            return cursor.fetchall()
    finally:
        conn.close()


@router_culturas.put('/{id}')
def alterar_cultura(id: int, cultura: Cultura):
    conn = conectar()
    try:
        with conn.cursor() as cursor:
            sql = """
                UPDATE cultura
                SET nome=%s, tipo=%s, ciclo_dias=%s
                WHERE id=%s
            """
            valores = (cultura.nome, cultura.tipo, cultura.ciclo_dias, id)
            cursor.execute(sql, valores)

            if cursor.rowcount == 0:
                conn.rollback()
                raise HTTPException(status_code=404, detail="Cultura não encontrada")

            conn.commit()
        return {"mensagem": "Cultura atualizada"}
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar: {e}")
    finally:
        conn.close()


@router_culturas.delete('/{id}')
def deletar_cultura(id: int):
    conn = conectar()
    try:
        with conn.cursor() as cursor:
            cursor.execute("DELETE FROM cultura WHERE id=%s", (id,))

            if cursor.rowcount == 0:
                conn.rollback()
                raise HTTPException(status_code=404, detail="Cultura não encontrada")

            conn.commit()
        return {"mensagem": "Cultura deletada"}
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao deletar: {e}")
    finally:
        conn.close()