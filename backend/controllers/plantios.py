from fastapi import APIRouter
from models.model import Plantio
from db import conectar

router_plantios = APIRouter(
    prefix="/plantios",
    tags=["Plantio"]
)

@router_plantios.post("/")
def cadastrar_plantio(plantio: Plantio):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO Plantio
        (cultura,data_plantio,area,idSafra,idTalhao)
        VALUES (%s,%s,%s,%s,%s)
    """, (
        plantio.cultura,
        plantio.data_plantio,
        plantio.area,
        plantio.idSafra,
        plantio.idTalhao
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem":"Plantio cadastrado"}


@router_plantios.get("/")
def listar_plantios():

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM Plantio")

    dados = cursor.fetchall()

    cursor.close()
    conn.close()

    return dados

@router_plantios.put("/{id}")
def atualizar_plantio(id: int, plantio: Plantio):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE Plantio
        SET cultura=%s,
            data_plantio=%s,
            area=%s,
            idSafra=%s,
            idTalhao=%s
        WHERE id=%s
    """, (
        plantio.cultura,
        plantio.data_plantio,
        plantio.area,
        plantio.idSafra,
        plantio.idTalhao,
        id
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Plantio atualizado"}


@router_plantios.delete("/{id}")
def deletar_plantio(id: int):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM Plantio WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Plantio deletado"}