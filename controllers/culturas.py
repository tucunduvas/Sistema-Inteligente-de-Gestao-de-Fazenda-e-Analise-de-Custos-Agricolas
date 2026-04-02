from fastapi import APIRouter

router_culturas = APIRouter(prefix="/culturas")

@router_culturas.get('/')  

def consultar_culturas():
    pass


@router_culturas.get('/{id}')  

def consultar_cultura(id: int):
    pass


@router_culturas.post('/')  

def cadastrar_culturas():
    pass


@router_culturas.put('/{id}')  

def alterar_cultura(id: int):
    pass


@router_culturas.delete('/{id}')  

def deletar_cultura(id: int):
    pass
