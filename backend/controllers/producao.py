from fastapi import APIRouter
from pydantic import BaseModel
from db import conectar


router_producao = APIRouter(prefix="/producao")

# Modelo esperado pelo Front (src/Pages/Dashboard/Lucro.tsx)
# Produção: { id, cultura, talhao, quantidade, unidade, valor_unitario, data }

@router_producao.get('/')
def consultar_producao():
    conn = conectar()
    cursor = conn.cursor()

    # Tenta ler uma tabela Producao (se existir). Caso o nome real seja outro,
    # ajuste aqui.
    try:
        cursor.execute(
            "SELECT id, cultura, talhao, quantidade, unidade, valor_unitario, data FROM Producao ORDER BY id DESC"
        )
    except Exception:
        # fallback: se não existir, busca por Colheita como produção (compatibilidade mínima)
        cursor.execute(
            "SELECT id, cultura, NULL as talhao, quantidade, NULL as unidade, NULL as valor_unitario, data_colheita as data FROM Colheita ORDER BY id DESC"
        )

    rows = cursor.fetchall()

    dados = []
    for r in rows:
        # tupla: (id, cultura, talhao, quantidade, unidade, valor_unitario, data)
        dados.append(
            {
                "id": r[0],
                "cultura": r[1],
                "talhao": r[2],
                "quantidade": float(r[3]) if r[3] is not None else 0,
                "unidade": r[4],
                "valor_unitario": float(r[5]) if r[5] is not None else 0,
                "data": r[6].isoformat() if hasattr(r[6], "isoformat") else r[6],
            }
        )

    cursor.close()
    conn.close()

    return dados



class ProducaoIn(BaseModel):
    cultura: str
    talhao: str | None = None
    quantidade: float
    unidade: str
    valor_unitario: float
    data: str


@router_producao.post('/')
def cadastrar_producao(payload: ProducaoIn):
    # garantir que campos obrigatórios do front chegaram (para evitar NotNullViolation)
    cultura = payload.cultura
    talhao = payload.talhao
    quantidade = payload.quantidade
    unidade = payload.unidade
    valor_unitario = payload.valor_unitario
    data = payload.data


    conn = conectar()
    cursor = conn.cursor()

    # Insere em Producao se existir; senão, insere em Colheita como compatibilidade.
    try:
        cursor.execute(
            """
            INSERT INTO Producao (cultura, talhao, quantidade, unidade, valor_unitario, data)
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            (cultura, talhao, quantidade, unidade, valor_unitario, data),
        )
    except Exception:
        cursor.execute(
            """
            INSERT INTO Colheita (cultura, data_colheita, quantidade, idCultura)
            VALUES (%s, %s, %s, %s)
            """,
            (cultura, data, quantidade, 0),
        )

    conn.commit()
    cursor.close()
    conn.close()

    return {"mensagem": "Produção registrada"}


@router_producao.delete('/{id}')
def deletar_producao(id: int):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM Producao WHERE id=%s", (id,))
    # se Producao não existir, tenta deletar em Colheita
    if cursor.rowcount == 0:
        cursor.execute("DELETE FROM Colheita WHERE id=%s", (id,))

    conn.commit()
    cursor.close()
    conn.close()

    return {"mensagem": "Produção deletada"}

