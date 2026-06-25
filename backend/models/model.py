from pydantic import BaseModel
import datetime
from datetime import date

class Fazenda(BaseModel):
    nome: str
    localizacao: str
    tamanho_hectares: float


class Talhao(BaseModel):
    nome: str
    area: float
    id_cultura: int
    data_plantio: date
    id_insumo: int
    id_maquina: int
    operador_responsavel: str

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
    unidade_medida: str | None = None
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

