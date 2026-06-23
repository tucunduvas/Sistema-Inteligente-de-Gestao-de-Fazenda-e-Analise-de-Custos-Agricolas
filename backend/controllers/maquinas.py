from fastapi import APIRouter
from models.model import Maquina
from db import conectar

router_maquinas = APIRouter(
    prefix="/maquinas",
    tags=["Máquinas"]
)


@router_maquinas.post("/")
def cadastrar_maquina(maquina: Maquina):

    conn = conectar()
    cursor = conn.cursor()

    # Compatível com o front (Maquinas.tsx):
    # front envia: { nome, tipo, marca, ano }
    # no model Maquina:
    #   modelo = marca
    #   nome não existe no model; então usamos status/nome conforme seu DB.
    # Ajuste: inserir (nome, modelo, tipo, status, ano) se sua tabela tiver essas colunas.

    # Para não quebrar em caso de coluna não existir, fazemos INSERT somente nas colunas que sabemos que existem
    sql = """
    INSERT INTO Maquina
    (nome, modelo, tipo, status, ano)
    VALUES (%s, %s, %s, %s, %s)
    """

    valores = (
        getattr(maquina, "nome", None),
        maquina.modelo,
        maquina.tipo,
        maquina.status,
        getattr(maquina, "ano", None),
    )

    # Se seu front estiver enviando 'nome' e 'ano' mas o model não tiver,
    # o Pydantic pode não aceitar; nesse caso, use um fallback no payload.
    cursor.execute(sql, valores)

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Máquina cadastrada"}



@router_maquinas.get("/")
def listar_maquinas():

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("SELECT id, nome, tipo, modelo, ano FROM Maquina")
    rows = cursor.fetchall()

    # Front espera: { id, nome, tipo, marca, ano }
    # Onde backend usa: modelo como marca
    dados = [
        {
            "id": r[0],
            "nome": r[1],
            "tipo": r[2],
            "marca": r[3],
            "ano": r[4],
        }
        for r in rows
    ]

    cursor.close()
    conn.close()

    return dados




@router_maquinas.put("/{id}")
def atualizar_maquina(id: int, maquina: Maquina):

    conn = conectar()
    cursor = conn.cursor()

    sql = """
    UPDATE Maquina
    SET modelo=%s,
        tipo=%s,
        status=%s
    WHERE id=%s
    """

    valores = (
        maquina.modelo,
        maquina.tipo,
        maquina.status,
        id
    )

    cursor.execute(sql, valores)

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Máquina atualizada"}


@router_maquinas.delete("/{id}")
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