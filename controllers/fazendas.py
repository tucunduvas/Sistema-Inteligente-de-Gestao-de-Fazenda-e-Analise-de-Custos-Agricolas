from fastapi import APIRouter
from models.model import Fazenda
from db import conectar

router_fazendas = APIRouter(
    prefix="/fazendas",
    tags=["Fazendas"]
)


# =========================
# CREATE
# =========================
@router_fazendas.post('/')
def cadastrar_fazenda(fazenda: Fazenda):

    conn = conectar()
    cursor = conn.cursor()

    sql = """
    INSERT INTO Fazenda
    (nome, localizacao, tamanho_hectares)
    VALUES (%s, %s, %s)
    """

    valores = (
        fazenda.nome,
        fazenda.localizacao,
        fazenda.tamanho_hectares
    )

    cursor.execute(sql, valores)

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Fazenda cadastrada"}


# =========================
# READ
# =========================
@router_fazendas.get('/')
def listar_fazendas():

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM Fazenda")

    dados = cursor.fetchall()

    cursor.close()
    conn.close()

    return dados


# =========================
# UPDATE
# =========================
@router_fazendas.put('/{id}')
def atualizar_fazenda(id: int, fazenda: Fazenda):

    conn = conectar()
    cursor = conn.cursor()

    sql = """
    UPDATE Fazenda
    SET nome=%s,
        localizacao=%s,
        tamanho_hectares=%s
    WHERE id=%s
    """

    valores = (
        fazenda.nome,
        fazenda.localizacao,
        fazenda.tamanho_hectares,
        id
    )

    cursor.execute(sql, valores)

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Fazenda atualizada"}


# =========================
# DELETE
# =========================
@router_fazendas.delete('/{id}')
def deletar_fazenda(id: int):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM Fazenda WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Fazenda deletada"}
