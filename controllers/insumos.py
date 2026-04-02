from fastapi import APIRouter

router_sementes= APIRouter(prefix="/sementes")
router_fertilizantes= APIRouter(prefix="/fertilizantes")
router_defensivos= APIRouter(prefix="/defensivos")

@router_sementes.get('/')  

def consultar_sementes():
    pass

@router_sementes.post('/')  

def cadastrar_sementes():
    pass

@router_fertilizantes.get('/')  

def consultar_fertilizantes():
    pass

@router_fertilizantes.post('/')  

def cadastrar_fertilizantes():
    pass

@router_defensivos.get('/')  

def consultar_defensivos():
    pass

@router_defensivos.post('/')  

def cadastrar_defensivos():
    pass

