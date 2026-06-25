from fastapi import APIRouter, HTTPException, status
from psycopg2.extras import RealDictCursor
from models.model import Talhao
from db import conectar

router_talhoes = APIRouter(
    prefix="/talhoes",
    tags=["Talhões"]
)


@router_talhoes.post('/', status_code=status.HTTP_201_CREATED)
def cadastrar_talhao(talhao: Talhao):
    conn = conectar()
    try:
        with conn.cursor() as cursor:
            sql = """
                INSERT INTO talhao
                (nome, area, id_cultura, data_plantio, id_insumo, id_maquina, operador_responsavel)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            """
            valores = (
                talhao.nome,
                talhao.area,
                talhao.id_cultura,
                talhao.data_plantio,
                talhao.id_insumo,
                talhao.id_maquina,
                talhao.operador_responsavel,
            )
            cursor.execute(sql, valores)
            novo_id = cursor.fetchone()[0]
            conn.commit()
        return {"mensagem": "Talhão cadastrado", "id": novo_id}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao cadastrar: {e}")
    finally:
        conn.close()


@router_talhoes.get('/')
def listar_talhoes():
    conn = conectar()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("""
                SELECT
                    t.id,
                    t.nome,
                    t.area,
                    t.data_plantio,
                    t.operador_responsavel,
                    c.id   AS id_cultura,
                    c.nome AS cultura,
                    i.id   AS id_insumo,
                    i.nome AS insumo,
                    m.id   AS id_maquina,
                    m.nome AS maquina
                FROM talhao t
                JOIN cultura c ON c.id = t.id_cultura
                JOIN insumo  i ON i.id = t.id_insumo
                JOIN maquina m ON m.id = t.id_maquina
            """)
            return cursor.fetchall()
    finally:
        conn.close()


@router_talhoes.put('/{id}')
def atualizar_talhao(id: int, talhao: Talhao):
    conn = conectar()
    try:
        with conn.cursor() as cursor:
            sql = """
                UPDATE talhao
                SET nome=%s, area=%s, id_cultura=%s, data_plantio=%s,
                    id_insumo=%s, id_maquina=%s, operador_responsavel=%s
                WHERE id=%s
            """
            valores = (
                talhao.nome,
                talhao.area,
                talhao.id_cultura,
                talhao.data_plantio,
                talhao.id_insumo,
                talhao.id_maquina,
                talhao.operador_responsavel,
                id,
            )
            cursor.execute(sql, valores)

            if cursor.rowcount == 0:
                conn.rollback()
                raise HTTPException(status_code=404, detail="Talhão não encontrado")

            conn.commit()
        return {"mensagem": "Talhão atualizado"}
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar: {e}")
    finally:
        conn.close()


@router_talhoes.delete('/{id}')
def deletar_talhao(id: int):
    conn = conectar()
    try:
        with conn.cursor() as cursor:
            cursor.execute("DELETE FROM talhao WHERE id=%s", (id,))

            if cursor.rowcount == 0:
                conn.rollback()
                raise HTTPException(status_code=404, detail="Talhão não encontrado")

            conn.commit()
        return {"mensagem": "Talhão deletado"}
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao deletar: {e}")
    finally:
        conn.close()