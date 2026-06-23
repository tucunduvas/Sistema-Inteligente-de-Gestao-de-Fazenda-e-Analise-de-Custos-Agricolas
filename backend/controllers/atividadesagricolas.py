from fastapi import APIRouter
from models.model import Atividade
from db import conectar

router_atividades = APIRouter(
    prefix="/atividades",
    tags=["Atividades"]
)

@router_atividades.post("/")
def cadastrar_atividade(atividade: Atividade):

    conn = conectar()
    cursor = conn.cursor()

    # Ajuste: o front pode enviar "" para horaInicio/horaFim quando não houver valores.
    # PostgreSQL/PSYCOPG2 não aceita "" como timestamp; então convertimos "" para None.
    hora_inicio = atividade.horaInicio if atividade.horaInicio not in (None, "") else None
    hora_fim = atividade.horaFim if atividade.horaFim not in (None, "") else None

    # persistir talhão/área afetada: no banco atual a tabela Atividade NÃO tem talhao.
    # Vamos guardar por 'descrição' via um prefixo curto para não perder o que o front envia.
    # Ajuste recomendado (correto) é adicionar coluna a Atividade ou criar FK para Talhao.
    # Por enquanto, manteremos compatibilidade com schema atual.

    descricao_final = atividade.descricao
    if atividade.talhao is not None and atividade.talhao != "":
        descricao_final = f"{atividade.talhao} | {atividade.descricao}"

    cursor.execute("""
        INSERT INTO Atividade
        (tipo,data,horaInicio,horaFim,custoTotal,descricao,idOperador)
        VALUES (%s,%s,%s,%s,%s,%s,%s)
    """, (
        atividade.tipo,
        atividade.data,
        hora_inicio,
        hora_fim,
        atividade.custoTotal,
        descricao_final,
        atividade.idOperador
    ))


    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem":"Atividade cadastrada"}


@router_atividades.get("/")
def listar_atividades():

    conn = conectar()
    cursor = conn.cursor()

    # Front espera:
    # { id, tipo, data, talhao, descricao }
    # Banco Atividade hoje tem: id,tipo,data,horaInicio,horaFim,custoTotal,descricao,idOperador
    # 'talhao' no front é string livre. Como Atividade não tem idTalhao direta,
    # vamos retornar talhao = '' (para não quebrar o render).
    cursor.execute(
        """
        SELECT id, tipo, data, descricao,
               '' as talhao


        FROM Atividade
        ORDER BY id DESC
        """
    )



    rows = cursor.fetchall()

    dados = [
        {
            "id": r[0],
            "tipo": r[1],
            "data": r[2].isoformat() if hasattr(r[2], "isoformat") else r[2],
            "talhao": r[4] if r[4] is not None else "",
            "descricao": r[3],
        }

        for r in rows
    ]


    cursor.close()
    conn.close()

    return dados


@router_atividades.put("/{id}")
def atualizar_atividade(id: int, atividade: Atividade):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE Atividade
        SET tipo=%s,
            data=%s,
            horaInicio=%s,
            horaFim=%s,
            custoTotal=%s,
            descricao=%s,
            idOperador=%s
        WHERE id=%s
    """, (
        atividade.tipo,
        atividade.data,
        atividade.horaInicio,
        atividade.horaFim,
        atividade.custoTotal,
        atividade.descricao,
        atividade.idOperador,
        id
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Atividade atualizada"}


@router_atividades.delete("/{id}")
def deletar_atividade(id: int):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM Atividade WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Atividade deletada"}