from fastapi import APIRouter, HTTPException, status
from psycopg2.extras import RealDictCursor
from models.model import Maquina
from db import conectar

router_maquinas = APIRouter(
    prefix="/maquinas",
    tags=["Máquinas"]
)


@router_maquinas.post("/", status_code=status.HTTP_201_CREATED)
def cadastrar_maquina(maquina: Maquina):
    conn = conectar()
    try:
        with conn.cursor() as cursor:
            sql = """
                INSERT INTO maquina (nome, tipo, marca, ano)
                VALUES (%s, %s, %s, %s)
                RETURNING id
            """
            valores = (
                maquina.nome,
                maquina.tipo,
                maquina.marca,
                maquina.ano
            )
            cursor.execute(sql, valores)
            novo_id = cursor.fetchone()[0]
            conn.commit()
        return {"mensagem": "Máquina cadastrada", "id": novo_id}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao cadastrar: {e}")
    finally:
        conn.close()


@router_maquinas.get("/")
def listar_maquinas():
    conn = conectar()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(
                "SELECT id, nome, tipo, marca, ano FROM maquina"
            )
            return cursor.fetchall()
    finally:
        conn.close()


@router_maquinas.put("/{id}")
def atualizar_maquina(id: int, maquina: Maquina):
    conn = conectar()
    try:
        with conn.cursor() as cursor:
            sql = """
                UPDATE maquina
                SET nome=%s, tipo=%s, marca=%s, ano=%s
                WHERE id=%s
            """
            valores = (
                maquina.nome,
                maquina.tipo,
                maquina.marca,
                maquina.ano,
                id,
            )
            cursor.execute(sql, valores)

            if cursor.rowcount == 0:
                conn.rollback()
                raise HTTPException(status_code=404, detail="Máquina não encontrada")

            conn.commit()
        return {"mensagem": "Máquina atualizada"}
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar: {e}")
    finally:
        conn.close()


@router_maquinas.delete("/{id}")
def deletar_maquina(id: int):
    conn = conectar()
    try:
        with conn.cursor() as cursor:
            cursor.execute("DELETE FROM maquina WHERE id=%s", (id,))

            if cursor.rowcount == 0:
                conn.rollback()
                raise HTTPException(status_code=404, detail="Máquina não encontrada")

            conn.commit()
        return {"mensagem": "Máquina deletada"}
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao deletar: {e}")
    finally:
        conn.close()