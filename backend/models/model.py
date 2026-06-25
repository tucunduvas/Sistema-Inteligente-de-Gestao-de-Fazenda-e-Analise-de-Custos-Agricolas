from pydantic import BaseModel
import datetime
from datetime import date

class Fazenda(BaseModel):
    nome: str
    localizacao: str
    tamanho_hectares: float


class Talhao(BaseModel):
    area: float
    tipoCultura: str
    idade: int
    volumeEstimado: float
    idFazenda: int



class Maquina(BaseModel):
    nome: str
    categoria: str
    marca: str
    ano: date | None = None

class Operador(BaseModel):
    nome: str
    cpf: str
    funcao: str
    
class Safra(BaseModel):
    inicio: str
    fim: str

class Cultura(BaseModel):
    nome: str
    safra: str | None = ""
    data: str | None = ""
    quantidade: float | None = 0
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
    tipo: str
    custo: float | None = None
    quantidade: float
    categoria: str | None = None
    unidade: str | None = None
    preco_unitario: float | None = None


class Atividade(BaseModel):
    tipo: str
    data: str
    horaInicio: str | None = ""
    horaFim: str | None = ""
    custoTotal: float | None = 0
    descricao: str
    idOperador: int | None = None
    # Compatibilidade com o front atual (Atividades.tsx)
    talhao: str | None = None

