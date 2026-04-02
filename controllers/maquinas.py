from fastapi import APIRouter

router_maquinas = APIRouter(prefix="/maquinas")

@router_maquinas.get('/')  

def consultar_maquinas():
    pass


@router_maquinas.get('/{id}')  

def consultar_maquina(id: int):
    pass


@router_maquinas.post('/')  

def cadastrar_maquinas():
    pass


@router_maquinas.put('/{id}')  

def alterar_maquina(id: int):
    pass


@router_maquinas.delete('/{id}')  

def deletar_maquina(id: int):
    pass
