from fastapi import APIRouter

router_producao = APIRouter(prefix="/producao")

@router_producao.get('/')  

def consultar_producao():
    pass


@router_producao.post('/')  

def cadastrar_producao():
    pass
