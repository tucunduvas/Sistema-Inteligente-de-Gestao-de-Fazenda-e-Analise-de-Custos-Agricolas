from fastapi import APIRouter

router_operadores = APIRouter(prefix="operadores")

@router_operadores.get('/')  

def consultar_operadores():
    pass


@router_operadores.get('/{id}')  

def consultar_operador(id: int):
    pass

@router_operadores.post('/')  

def cadastrar_operadores():
    pass


@router_operadores.put('/{id}')  

def alterar_operador(id: int):
    pass


@router_operadores.delete('/{id}')  

def deletar_operador(id: int):
    pass
