from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sigFaz.backend.app.database import get_db
from app.controllers.model import Fazenda


class fazenda_base(BaseModel):
    nome: str
    localizacao: str
    areaTotal: float


class fazenda_create(fazenda_base):
    pass


class fazenda_response(fazenda_base):
    id: int

    class Config:
        from_attributes = True
        


router_fazendas = APIRouter(prefix="/fazendas", tags=["Fazendas"])

@router_fazendas.post("/", response_model=fazenda_response)
def cadastrar_fazenda(dados: fazenda_create, db: Session = Depends(get_db)):

    fazenda_existente = db.query(Fazenda).filter(
        Fazenda.nome == dados.nome,
        Fazenda.localizacao == dados.localizacao
    ).first()

    if fazenda_existente:
        raise HTTPException(
            status_code=400,
            detail="Já existe uma fazenda com esse nome nessa localização"
        )

    nova_fazenda = Fazenda(**dados.dict())

    db.add(nova_fazenda)
    db.commit()
    db.refresh(nova_fazenda)

    return nova_fazenda

@router_fazendas.get("/", response_model=list[fazenda_response])
def consultar_fazendas(db: Session = Depends(get_db)):
    return db.query(Fazenda).all()


@router_fazendas.get("/{id}", response_model=fazenda_response)
def consultar_fazenda(id: int, db: Session = Depends(get_db)):
    
    fazenda = db.query(Fazenda).filter(Fazenda.id == id).first()

    if not fazenda:
        raise HTTPException(status_code=404, detail="Fazenda não encontrada")

    return fazenda

@router_fazendas.put("/{id}", response_model=fazenda_response)
def alterar_fazenda(id: int, dados: fazenda_create, db: Session = Depends(get_db)):
    
    fazenda = db.query(Fazenda).filter(Fazenda.id == id).first()
    
    fazenda_existente = db.query(Fazenda).filter(
        Fazenda.nome == dados.nome,
        Fazenda.localizacao == dados.localizacao,
        Fazenda.id != id  
    ).first()

    if fazenda_existente:
        raise HTTPException(
            status_code=400,
            detail="Já existe uma fazenda com esse nome nessa localização"
        )
        
    if not fazenda:
        raise HTTPException(status_code=404, detail="Fazenda não encontrada")

    for key, value in dados.dict().items():
        setattr(fazenda, key, value)

    db.commit()
    db.refresh(fazenda)

    return fazenda

@router_fazendas.delete("/{id}")
def deletar_fazenda(id: int, db: Session = Depends(get_db)):
    fazenda = db.query(Fazenda).filter(Fazenda.id == id).first()

    if not fazenda:
        raise HTTPException(status_code=404, detail="Fazenda não encontrada")

    db.delete(fazenda)
    db.commit()

    return {"mensagem": "Fazenda removida"}

# se remover uma fazenda remove também os talhoes dela
