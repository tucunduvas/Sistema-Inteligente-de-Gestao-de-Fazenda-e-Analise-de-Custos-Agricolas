from fastapi import APIRouter
from models.model import Maquina
from db import conectar

router_maquinas = APIRouter(
    prefix="/maquinas",
    tags=["Máquinas"]
)


@router_maquinas.post('/')
def cadastrar_maquina(maquina: Maquina):

    conn = conectar()
    cursor = conn.cursor()

    sql = """
    INSERT INTO Maquina
    (nome, tipo, status)
    VALUES (%s, %s, %s)
    """

    valores = (
        maquina.nome,
        maquina.tipo,
        maquina.status
    )

    cursor.execute(sql, valores)

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Máquina cadastrada"}


@router_maquinas.get('/')
def listar_maquinas():

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM Maquina")

    dados = cursor.fetchall()

    cursor.close()
    conn.close()

    return dados


@router_maquinas.put('/{id}')
def atualizar_maquina(id: int, maquina: Maquina):

    conn = conectar()
    cursor = conn.cursor()

    sql = """
    UPDATE Maquina
    SET nome=%s,
        tipo=%s,
        status=%s
    WHERE id=%s
    """

    valores = (
        maquina.nome,
        maquina.tipo,
        maquina.status,
        id
    )

    cursor.execute(sql, valores)

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Máquina atualizada"}


@router_maquinas.delete('/{id}')
def deletar_maquina(id: int):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM Maquina WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Máquina deletada"}
