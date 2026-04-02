from fastapi import APIRouter

router_talhoes = APIRouter(prefix="/talhoes")

@router_talhoes.get('/')  

def consultar_talhoes():
    pass


@router_talhoes.get('/{id}')  

def consultar_talhao(id: int):
    pass


@router_talhoes.post('/')  

def cadastrar_talhoes():
    pass 


@router_talhoes.put('/{id}')  

def alterar_talhao(id: int):
    pass


@router_talhoes.delete('/{id}')  

def deletar_talhao(id: int):
    pass

@router_talhoes.get('/fazenda/{id}')
def listar_por_fazenda(id: int):
    return {"msg": f"talhões da fazenda {id}"}
