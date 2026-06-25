from fastapi import APIRouter
from models.model import Insumo
from db import conectar

router_insumos = APIRouter(
    prefix="/insumos",
    tags=["Insumos"]
)

@router_insumos.post("/")
def cadastrar_insumo(insumo: Insumo):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO Insumo
        (nome,tipo,custo,quantidade)
        VALUES (%s,%s,%s,%s)
    """, (
        insumo.nome,
        insumo.tipo,
        insumo.custo,
        insumo.quantidade
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem":"Insumo cadastrado"}


@router_insumos.get("/")
def listar_insumos():

    conn = conectar()
    cursor = conn.cursor()

    # Front espera:
    # { id, nome, categoria, quantidade, unidade, preco_unitario }
    # Banco Insumo (modelo atual) tem: id, nome, tipo, custo, quantidade
    # Onde: categoria = tipo; preco_unitario = custo; unidade = (não existe no banco -> vazio)
    cursor.execute("SELECT id, nome, tipo, custo, quantidade FROM Insumo")
    rows = cursor.fetchall()

    dados = [
        {
            "id": r[0],
            "nome": r[1],
            "categoria": r[2] if r[2] is not None else "",
            "quantidade": r[4],
            "unidade": "",
            "preco_unitario": r[3],
        }
        for r in rows
    ]

    cursor.close()
    conn.close()

    return dados


@router_insumos.put("/{id}")
def atualizar_insumo(id: int, insumo: Insumo):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE Insumo
        SET nome=%s,
            tipo=%s,
            custo=%s,
            quantidade=%s
        WHERE id=%s
    """, (
        insumo.nome,
        insumo.tipo,
        insumo.custo,
        insumo.quantidade,
        id
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Insumo atualizado"}


@router_insumos.delete("/{id}")
def deletar_insumo(id: int):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM Insumo WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Insumo deletado"}