from fastapi import APIRouter

router_custos = APIRouter(prefix="/custos")

@router_custos.get('/')  

def consultar_custos():
    pass

@router_custos.post('/')  

def cadastrar_custos():
    pass

@router_custos.get('/por-hectare')
def calcular_custo_por_hectare():
    pass 

@router_custos.get('/por-safra')
def calcular_custo_por_safra():
    pass 

