from fastapi import APIRouter, Body, HTTPException
from pydantic import BaseModel

router_fazendas = APIRouter(prefix="/fazendas")

class FazendaInput(BaseModel):
    nome: str
    localizacao: str
    area_total_hectares: float


class FazendaOutput(BaseModel):
    id: int
    nome: str
    localizacao: str
    area_total_hectares: float


banco_fazendas = []
contador_id = 1

@router_fazendas.get('/')  

def consultar_fazendas():
    pass


@router_fazendas.get('/{id}')  

def consultar_fazenda(id: int):
    pass


@router_fazendas.post("/", response_model=FazendaOutput, status_code=201)
def cadastrar_fazenda(fazenda: FazendaInput = Body(...)):
    global contador_id

    # validação
    for fazenda_existente in banco_fazendas:
        if (
            fazenda_existente["nome"] == fazenda.nome
            and fazenda_existente["localizacao"] == fazenda.localizacao
            and fazenda_existente["area_total_hectares"] == fazenda.area_total_hectares
        ):
            raise HTTPException(
                status_code=400,
                detail="Já existe uma fazenda com esses mesmos dados."
            )

    nova_fazenda = {
        "id": contador_id,
        "nome": fazenda.nome,
        "localizacao": fazenda.localizacao,
        "area_total_hectares": fazenda.area_total_hectares,
    }

    banco_fazendas.append(nova_fazenda)
    contador_id += 1

    return nova_fazenda


@router_fazendas.put('/{id}')  

def alterar_fazenda(id: int):
    pass


@router_fazendas.delete('/{id}')  

def deletar_fazenda(id: int):
    pass
