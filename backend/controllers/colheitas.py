from fastapi import APIRouter
from models.model import Colheita
from db import conectar

router_colheitas = APIRouter(
    prefix="/colheitas",
    tags=["Colheita"]
)

# CREATE

@router_colheitas.post("/")
def cadastrar_colheita(colheita: Colheita):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO Colheita
        (cultura,data_colheita,quantidade,idCultura)
        VALUES (%s,%s,%s,%s)
    """, (
        colheita.cultura,
        colheita.data_colheita,
        colheita.quantidade,
        colheita.idCultura
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Colheita cadastrada"}


# READ

@router_colheitas.get("/")
def listar_colheitas():

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM Colheita")

    dados = cursor.fetchall()

    cursor.close()
    conn.close()

    return dados



@router_colheitas.put("/{id}")
def atualizar_colheita(id: int, colheita: Colheita):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE Colheita
        SET cultura=%s,
            data_colheita=%s,
            quantidade=%s,
            idCultura=%s
        WHERE id=%s
    """, (
        colheita.cultura,
        colheita.data_colheita,
        colheita.quantidade,
        colheita.idCultura,
        id
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Colheita atualizada"}



@router_colheitas.delete("/{id}")
def deletar_colheita(id: int):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM Colheita WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Colheita deletada"}