from fastapi import APIRouter
from models.model import Operador
from db import conectar

router_operadores = APIRouter(
    prefix="/operadores",
    tags=["Operadores"]
)


@router_operadores.post('/')
def cadastrar_operador(operador: Operador):

    conn = conectar()
    cursor = conn.cursor()

    sql = """
    INSERT INTO Operador
    (nome, cpf, funcao)
    VALUES (%s, %s, %s)
    """

    valores = (
        operador.nome,
        operador.cpf,
        operador.funcao
    )

    cursor.execute(sql, valores)

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Operador cadastrado"}


@router_operadores.get('/')
def listar_operadores():

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM Operador")

    dados = cursor.fetchall()

    cursor.close()
    conn.close()

    return dados


@router_operadores.put('/{id}')
def atualizar_operador(id: int, operador: Operador):

    conn = conectar()
    cursor = conn.cursor()

    sql = """
    UPDATE Operador
    SET nome=%s,
        cpf=%s,
        funcao=%s
    WHERE id=%s
    """

    valores = (
        operador.nome,
        operador.cpf,
        operador.funcao,
        id
    )

    cursor.execute(sql, valores)

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Operador atualizado"}


@router_operadores.delete('/{id}')
def deletar_operador(id: int):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM Operador WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Operador deletado"}
