from fastapi import APIRouter

router_operadores = APIRouter(
    prefix='/operadores',
    tags=['Operadores']
)


@router_operadores.get('/')
def listar_operadores():
    return {
        'mensagem': 'Rota operadores funcionando'
    }
