from fastapi import APIRouter
from models.model import Talhao
from db import conectar

router_talhoes = APIRouter(
    prefix="/talhoes",
    tags=["Talhões"]
)


@router_talhoes.post('/')
def cadastrar_talhao(talhao: Talhao):

    conn = conectar()
    cursor = conn.cursor()

    sql = """
    INSERT INTO Talhao
    (area, tipoCultura, idade, volumeEstimado, idFazenda)
    VALUES (%s, %s, %s, %s, %s)
    """

    valores = (
        talhao.area,
        talhao.tipoCultura,
        talhao.idade,
        talhao.volumeEstimado,
        talhao.idFazenda
    )

    cursor.execute(sql, valores)

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Talhão cadastrado"}


@router_talhoes.get('/')
def listar_talhoes():

    conn = conectar()
    cursor = conn.cursor()

    # Base dos campos do Talhão
    cursor.execute(
        "SELECT id, area, tipoCultura, idade, volumeEstimado, idFazenda FROM Talhao"
    )
    rows = cursor.fetchall()

    # Cálculos derivados (simples) — para compatibilizar com o front
    # - produtividade: usa volumeEstimado (provisório)
    # - custoHa: usa custo por hectare calculado em /custos/por-hectare
    # - status: regra simples por idade
    cursor.execute(
        """
        SELECT
          COALESCE(SUM(c.valor), 0) / NULLIF(SUM(f.tamanho_hectares), 0) AS custo_por_hectare
        FROM Custos c
        CROSS JOIN (SELECT COALESCE(SUM(tamanho_hectares),0) AS tamanho_hectares FROM Fazenda) f
        """
    )
    custo_por_hectare_row = cursor.fetchone()
    custo_por_hectare = float(custo_por_hectare_row[0]) if custo_por_hectare_row and custo_por_hectare_row[0] is not None else 0.0

    def calcular_status(idade: int) -> str:
        try:
            if idade is None:
                return "—"
            if idade <= 30:
                return "Plantio"
            if idade <= 70:
                return "Desenvolvimento"
            return "Colheita"
        except Exception:
            return "—"

    dados = []
    for r in rows:
        talhao_id = r[0]
        area = r[1]
        tipo_cultura = r[2]
        idade = r[3]
        volume_estimado = r[4]
        id_fazenda = r[5]

        produtividade = float(volume_estimado) if volume_estimado is not None else 0.0
        status = calcular_status(idade)

        dados.append(
            {
                "id": talhao_id,
                "area": float(area) if area is not None else 0.0,
                "tipoCultura": tipo_cultura,
                "idade": int(idade) if idade is not None else 0,
                "volumeEstimado": float(volume_estimado) if volume_estimado is not None else 0.0,
                "idFazenda": int(id_fazenda) if id_fazenda is not None else 0,
                "produtividade": produtividade,
                "custoHa": float(custo_por_hectare) if custo_por_hectare is not None else 0.0,
                "status": status,
            }
        )

    cursor.close()
    conn.close()

    return dados




@router_talhoes.put('/{id}')
def atualizar_talhao(id: int, talhao: Talhao):

    conn = conectar()
    cursor = conn.cursor()

    sql = """
    UPDATE Talhao
    SET area=%s,
        tipoCultura=%s,
        idade=%s,
        volumeEstimado=%s,
        idFazenda=%s
    WHERE id=%s
    """

    valores = (
        talhao.area,
        talhao.tipoCultura,
        talhao.idade,
        talhao.volumeEstimado,
        talhao.idFazenda,
        id
    )

    cursor.execute(sql, valores)

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Talhão atualizado"}


@router_talhoes.delete('/{id}')
def deletar_talhao(id: int):

    conn = conectar()
    cursor = conn.cursor()

    # Se houver Plantio referenciando este Talhão, primeiro remove os Plantios.
    # Isso evita ForeignKeyViolation ao deletar Talhao.
    cursor.execute(
        "DELETE FROM Plantio WHERE idTalhao=%s",
        (id,)
    )

    cursor.execute(
        "DELETE FROM Talhao WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Talhão deletado"}
