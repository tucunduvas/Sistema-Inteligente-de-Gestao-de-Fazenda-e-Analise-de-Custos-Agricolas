from fastapi import APIRouter

router_atividades = APIRouter(prefix="/atividades")

@router_atividades.post('/plantio')
def criar_plantio():
    pass

@router_atividades.get('/plantio')
def listar_plantios():
    pass

@router_atividades.post('/colheita')
def criar_colheita():
    pass

@router_atividades.get('/colheita')
def listar_colheitas():
    pass