from pydantic import BaseModel


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
    tipo: str
    status: str


class Operador(BaseModel):
    nome: str
    cpf: str
    funcao: str


class Cultura(BaseModel):
    nome: str
    safra: str


class Insumo(BaseModel):
    nome: str
    quantidade: int


class Plantio(BaseModel):
    cultura: str
    data_plantio: str
    area: float


class Colheita(BaseModel):
    cultura: str
    data_colheita: str
    quantidade: float
