from fastapi import APIRouter

router_fazendas = APIRouter(prefix="/fazendas")

@router_fazendas.get('/')  

def consultar_fazendas():
    pass


@router_fazendas.get('/{id}')  

def consultar_fazenda(id: int):
    pass


@router_fazendas.post('/')  

def cadastrar_fazendas():
    pass


@router_fazendas.put('/{id}')  

def alterar_fazenda(id: int):
    pass


@router_fazendas.delete('/{id}')  

def deletar_fazenda(id: int):
    pass
