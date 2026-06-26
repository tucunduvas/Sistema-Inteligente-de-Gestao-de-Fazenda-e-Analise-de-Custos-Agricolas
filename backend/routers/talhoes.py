from fastapi import APIRouter, HTTPException, status
from psycopg2.extras import RealDictCursor
from models.model import Talhao
from db import conectar

router_talhoes = APIRouter(
    prefix="/talhoes",
    tags=["Talhões"]
)


@router_talhoes.post("/", status_code=status.HTTP_201_CREATED)
def cadastrar_talhao(talhao: Talhao):
    conn = conectar()

    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                INSERT INTO talhao
                (nome, area_hectares, cultura_id, data_plantio,
                 insumo, maquina_id, operador)
                VALUES (%s,%s,%s,%s,%s,%s,%s)
                RETURNING id
            """, (
                talhao.nome,
                talhao.area_hectares,
                talhao.cultura_id,
                talhao.data_plantio,
                talhao.insumo,
                talhao.maquina_id,
                talhao.operador,
            ))

            novo_id = cursor.fetchone()[0]
            conn.commit()

            return {
                "mensagem": "Talhão cadastrado com sucesso",
                "id": novo_id
            }

    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:
        conn.close()


@router_talhoes.get("/")
def listar_talhoes():
    conn = conectar()

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:

            cursor.execute("""
                SELECT
                    t.id,
                    t.nome,
                    t.area_hectares,
                    t.data_plantio,
                    t.insumo,
                    t.operador,

                    c.id   AS cultura_id,
                    c.nome AS cultura,

                    m.id   AS maquina_id,
                    m.nome AS maquina

                FROM talhao t
                LEFT JOIN cultura c
                    ON c.id = t.cultura_id

                LEFT JOIN maquina m
                    ON m.id = t.maquina_id

                ORDER BY t.id;
            """)

            return cursor.fetchall()

    finally:
        conn.close()


@router_talhoes.put("/{id}")
def atualizar_talhao(id: int, talhao: Talhao):

    conn = conectar()

    try:
        with conn.cursor() as cursor:

            cursor.execute("""
                UPDATE talhao
                SET
                    nome=%s,
                    area_hectares=%s,
                    cultura_id=%s,
                    data_plantio=%s,
                    insumo=%s,
                    maquina_id=%s,
                    operador=%s
                WHERE id=%s
            """, (
                talhao.nome,
                talhao.area_hectares,
                talhao.cultura_id,
                talhao.data_plantio,
                talhao.insumo,
                talhao.maquina_id,
                talhao.operador,
                id
            ))

            if cursor.rowcount == 0:
                conn.rollback()
                raise HTTPException(
                    status_code=404,
                    detail="Talhão não encontrado"
                )

            conn.commit()

            return {
                "mensagem": "Talhão atualizado com sucesso"
            }

    except HTTPException:
        raise

    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:
        conn.close()


@router_talhoes.delete("/{id}")
def deletar_talhao(id: int):

    conn = conectar()

    try:
        with conn.cursor() as cursor:

            cursor.execute(
                "DELETE FROM talhao WHERE id=%s",
                (id,)
            )

            if cursor.rowcount == 0:
                conn.rollback()
                raise HTTPException(
                    status_code=404,
                    detail="Talhão não encontrado"
                )

            conn.commit()

            return {
                "mensagem": "Talhão removido com sucesso"
            }

    except HTTPException:
        raise

    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:
        conn.close()