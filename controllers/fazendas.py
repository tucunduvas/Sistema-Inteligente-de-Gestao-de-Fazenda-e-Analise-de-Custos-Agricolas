from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router_fazendas = APIRouter(prefix='/fazendas', tags=['Fazendas'])


class FazendaInput(BaseModel):
    nome: str
    localizacao: str
    area_total_hectares: float


banco_fazendas = []


@router_fazendas.post('/')
def cadastrar_fazenda(dados: FazendaInput):
    novo_id = len(banco_fazendas) + 1

    fazenda = {
        'id': novo_id,
        'nome': dados.nome,
        'localizacao': dados.localizacao,
        'area_total_hectares': dados.area_total_hectares
    }

    banco_fazendas.append(fazenda)

    return {
        'mensagem': 'Fazenda cadastrada com sucesso',
        'dados': fazenda
    }


@router_fazendas.get('/')
def consultar_fazendas():
    return banco_fazendas


@router_fazendas.get('/{id}')
def consultar_fazenda(id: int):
    for fazenda in banco_fazendas:
        if fazenda['id'] == id:
            return fazenda

    raise HTTPException(status_code=404, detail='Fazenda não encontrada')


@router_fazendas.put('/{id}')
def alterar_fazenda(id: int, dados: FazendaInput):
    for fazenda in banco_fazendas:
        if fazenda['id'] == id:
            fazenda['nome'] = dados.nome
            fazenda['localizacao'] = dados.localizacao
            fazenda['area_total_hectares'] = dados.area_total_hectares

            return {
                'mensagem': 'Fazenda atualizada',
                'dados': fazenda
            }

    raise HTTPException(status_code=404, detail='Fazenda não encontrada')


@router_fazendas.delete('/{id}')
def deletar_fazenda(id: int):
    for fazenda in banco_fazendas:
        if fazenda['id'] == id:
            banco_fazendas.remove(fazenda)

            return {
                'mensagem': 'Fazenda removida'
            }

    raise HTTPException(status_code=404, detail='Fazenda não encontrada')
