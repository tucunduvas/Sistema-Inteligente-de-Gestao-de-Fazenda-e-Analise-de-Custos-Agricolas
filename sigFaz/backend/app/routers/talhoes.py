from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sigFaz.backend.app.database import get_db
from app.controllers.model import Fazenda

router_talhoes = APIRouter(prefix="/talhoes")

class talhao_base(BaseModel):
    area: str
    tipo_cultura: str
    idade: int
    volume_estimado: float
    id_fazenda: int 

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
