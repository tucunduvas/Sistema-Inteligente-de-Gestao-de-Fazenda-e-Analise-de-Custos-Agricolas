from fastapi import APIRouter

router_maquinas = APIRouter(
    prefix='/maquinas',
    tags=['Máquinas']
)


@router_maquinas.get('/')
def listar_maquinas():
    return {
        'mensagem': 'Rota máquinas funcionando'
    }
