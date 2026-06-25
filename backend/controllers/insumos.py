from fastapi import APIRouter, HTTPException, status
from psycopg2.extras import RealDictCursor
from models.model import Insumo
from db import conectar

router_insumos = APIRouter(
    prefix="/insumos",
    tags=["Insumos"]
)


@router_insumos.post("/", status_code=status.HTTP_201_CREATED)
def cadastrar_insumo(insumo: Insumo):
    conn = conectar()
    try:
        with conn.cursor() as cursor:
            sql = """
                INSERT INTO insumo (nome, quantidade, categoria, unidade_medida, preco_unitario)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id
            """
            valores = (
                insumo.nome,
                insumo.quantidade,
                insumo.categoria,
                insumo.unidade_medida,
                insumo.preco_unitario,
            )
            cursor.execute(sql, valores)
            novo_id = cursor.fetchone()[0]
            conn.commit()
        return {"mensagem": "Insumo cadastrado", "id": novo_id}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao cadastrar: {e}")
    finally:
        conn.close()


@router_insumos.get("/")
def listar_insumos():
    conn = conectar()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("""
                SELECT id, nome, quantidade, categoria, unidade_medida, preco_unitario
                FROM insumo
            """)
            return cursor.fetchall()
    finally:
        conn.close()


@router_insumos.put("/{id}")
def atualizar_insumo(id: int, insumo: Insumo):
    conn = conectar()
    try:
        with conn.cursor() as cursor:
            sql = """
                UPDATE insumo
                SET nome=%s, quantidade=%s, categoria=%s, unidade_medida=%s, preco_unitario=%s
                WHERE id=%s
            """
            valores = (
                insumo.nome,
                insumo.quantidade,
                insumo.categoria,
                insumo.unidade_medida,
                insumo.preco_unitario,
                id,
            )
            cursor.execute(sql, valores)

            if cursor.rowcount == 0:
                conn.rollback()
                raise HTTPException(status_code=404, detail="Insumo não encontrado")

            conn.commit()
        return {"mensagem": "Insumo atualizado"}
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar: {e}")
    finally:
        conn.close()


@router_insumos.delete("/{id}")
def deletar_insumo(id: int):
    conn = conectar()
    try:
        with conn.cursor() as cursor:
            cursor.execute("DELETE FROM insumo WHERE id=%s", (id,))

            if cursor.rowcount == 0:
                conn.rollback()
                raise HTTPException(status_code=404, detail="Insumo não encontrado")

            conn.commit()
        return {"mensagem": "Insumo deletado"}
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao deletar: {e}")
    finally:
        conn.close()