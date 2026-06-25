from fastapi import APIRouter
from pydantic import BaseModel
from db import conectar


# Modelo esperado pelo Front (src/Pages/Dashboard/Gastos.tsx / src/Pages/Dashboard/Lucro.tsx)
# Gasto: { id, categoria, descricao, valor, data }

router_custos = APIRouter(prefix="/custos")

@router_custos.get('/')
def consultar_custos():
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("SELECT id, categoria, descricao, valor, data FROM Custos ORDER BY id DESC")
    rows = cursor.fetchall()

    # converter tuplas -> objetos compatíveis com o front
    dados = [
        {"id": r[0], "categoria": r[1], "descricao": r[2], "valor": float(r[3]) if r[3] is not None else 0, "data": r[4].isoformat() if hasattr(r[4], "isoformat") else r[4]}
        for r in rows
    ]

    cursor.close()
    conn.close()

    return dados



class CustoIn(BaseModel):
    categoria: str
    descricao: str | None = None
    valor: float
    data: str


@router_custos.post('/')
def cadastrar_custos(payload: CustoIn):
    # garantir que campos obrigatórios do front chegaram (para evitar NotNullViolation)
    categoria = payload.categoria
    descricao = payload.descricao
    valor = payload.valor
    data = payload.data


    """Compatibilidade: FastAPI vai aceitar tanto corpo JSON quanto parâmetros.

    Front envia:
    {
      categoria: string,
      descricao: string,
      valor: number,
      data: 'YYYY-MM-DD'
    }
    """
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO Custos (categoria, descricao, valor, data)
        VALUES (%s, %s, %s, %s)
        """,
        (categoria, descricao, valor, data),
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Custo cadastrado"}


@router_custos.delete('/{id}')
def deletar_custo(id: int):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM Custos WHERE id=%s", (id,))

    conn.commit()
    cursor.close()
    conn.close()

    return {"mensagem": "Custo deletado"}


@router_custos.get('/por-hectare')
def calcular_custo_por_hectare():
    # Exemplo simples: soma custos / soma tamanho_hectares de todas as fazendas
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
          COALESCE(SUM(c.valor), 0) / NULLIF(SUM(f.tamanho_hectares), 0) AS custo_por_hectare
        FROM Custos c
        CROSS JOIN (SELECT COALESCE(SUM(tamanho_hectares),0) AS tamanho_hectares FROM Fazenda) f
        """
    )

    dados = cursor.fetchone()
    cursor.close()
    conn.close()

    return dados


@router_custos.get('/por-safra')
def calcular_custo_por_safra():
    # Sem esquema de Safra em Custos, retorna placeholder agregando por ano(data)
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
          EXTRACT(YEAR FROM data) AS ano,
          SUM(valor) AS total_custos
        FROM Custos
        GROUP BY ano
        ORDER BY ano DESC
        """
    )

    dados = cursor.fetchall()
    cursor.close()
    conn.close()

    return dados

