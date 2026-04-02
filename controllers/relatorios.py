from fastapi import APIRouter

router_relatorios = APIRouter(prefix="/relatorios")

@router_relatorios.get('/produtividade')
def relatorio_produtividade():
    pass


@router_relatorios.get('/custos')
def relatorio_custos():
    pass