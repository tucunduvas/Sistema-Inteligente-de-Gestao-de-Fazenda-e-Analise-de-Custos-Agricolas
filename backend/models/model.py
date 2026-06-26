from pydantic import BaseModel
import datetime
from datetime import date
from pydantic import BaseModel, EmailStr

class Fazenda(BaseModel):
    nome: str
    localizacao: str
    tamanho_hectares: float


class Talhao(BaseModel):
    nome: str
    area_hectares: float
    cultura_id: int
    data_plantio: date
    insumo: str
    maquina_id: int
    operador: str

class Maquina(BaseModel):
    nome: str
    tipo: str
    marca: str
    ano: int 
    
class Producao(BaseModel):
    cultura: str
    talhao: str | None = None
    quantidade: float
    unidade: str = "sacas"
    valor_unitario: float
    data: date


class Custo(BaseModel):
    categoria: str
    descricao: str
    valor: float
    data: date
    
class Operador(BaseModel):
    nome: str
    cpf: str
    funcao: str
    
class Safra(BaseModel):
    inicio: str
    fim: str

class Cultura(BaseModel):
    nome: str
    tipo: str | None = None
    ciclo_dias: int | None = None


class Plantio(BaseModel):
    cultura: str
    data_plantio: str
    area: float
    idSafra: int
    idTalhao: int

class Colheita(BaseModel):
    cultura: str
    data_colheita: str
    quantidade: float
    idCultura: int

class Insumo(BaseModel):
    nome: str
    quantidade: float
    categoria: str | None = None
    unidade: str | None = None
    preco_unitario: float | None = None


class Atividade(BaseModel):
    tipo: str
    data: date
    talhao: str
    descricao: str


class Login(BaseModel):
    email: EmailStr
    senha: str


class Cadastro(BaseModel):
    email: EmailStr
    senha: str


class TokenResponse(BaseModel):
    token: str
    usuario: str


class UsuarioResponse(BaseModel):
    id: int
    email: str
