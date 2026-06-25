from fastapi import APIRouter
from models.model import Cultura
from db import conectar

router_culturas = APIRouter(
    prefix="/culturas",
    tags=["Culturas"]
)

@router_culturas.post("/")
def cadastrar_cultura(cultura: Cultura):

    conn = conectar()
    cursor = conn.cursor()

    # Mapeamento compatível com o front:
    # Front envia: { nome, tipo, ciclo_dias }
    # No model:
    #   tipo -> safra
    #   ciclo_dias -> quantidade
    cursor.execute("""
        INSERT INTO Cultura
        (nome, safra, data, quantidade)
        VALUES (%s,%s,%s,%s)
    """, (
        cultura.nome,
        cultura.tipo,
        cultura.data,
        cultura.ciclo_dias
    ))


    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Cultura cadastrada"}


@router_culturas.get("/")
def listar_culturas():

    conn = conectar()
    cursor = conn.cursor()

    # Front espera:
    # { id, nome, tipo, ciclo_dias }
    # Banco (Cultura) está com colunas: id, nome, safra, data, quantidade
    # Onde: tipo = safra; ciclo_dias = quantidade
    cursor.execute("SELECT id, nome, safra, data, quantidade FROM Cultura")
    rows = cursor.fetchall()

    dados = [
        {
            "id": r[0],
            "nome": r[1],
            "tipo": r[2] if r[2] is not None else "",
            "ciclo_dias": r[4] if r[4] is not None else 0,
        }
        for r in rows
    ]

    cursor.close()
    conn.close()

    return dados


@router_culturas.put("/{id}")
def atualizar_cultura(id: int, cultura: Cultura):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE Cultura
        SET nome=%s,
            safra=%s,
            data=%s,
            quantidade=%s
        WHERE id=%s
    """, (
        cultura.nome,
        cultura.safra,
        cultura.data,
        cultura.quantidade,
        id
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Cultura atualizada"}


@router_culturas.delete("/{id}")
def deletar_cultura(id: int):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM Cultura WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Cultura deletada"}