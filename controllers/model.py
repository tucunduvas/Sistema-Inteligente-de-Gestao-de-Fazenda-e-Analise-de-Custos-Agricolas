from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, Time, TIMESTAMP
from sqlalchemy.orm import relationship
from database import Base


class Fazenda(Base):
    __tablename__ = "fazenda"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100))
    localizacao = Column(String(150))
    area_total = Column(Float)

    talhoes = relationship("Talhao", back_populates="fazenda")


class Talhao(Base):
    __tablename__ = "talhao"

    id = Column(Integer, primary_key=True, index=True)
    area = Column(Integer)
    tipo_cultura = Column(String(100))
    idade = Column(Integer)
    volume_estimado = Column(Float)

    id_fazenda = Column(Integer, ForeignKey("fazenda.id"))

    fazenda = relationship("Fazenda", back_populates="talhoes")
    plantios = relationship("Plantio", back_populates="talhao")


class Safra(Base):
    __tablename__ = "safra"

    id = Column(Integer, primary_key=True, index=True)
    inicio = Column(Date)
    fim = Column(Date)

    plantios = relationship("Plantio", back_populates="safra")


class Plantio(Base):
    __tablename__ = "plantio"

    id = Column(Integer, primary_key=True, index=True)
    data = Column(Date)

    id_safra = Column(Integer, ForeignKey("safra.id"))
    id_talhao = Column(Integer, ForeignKey("talhao.id"))

    safra = relationship("Safra", back_populates="plantios")
    talhao = relationship("Talhao", back_populates="plantios")


class Cultura(Base):
    __tablename__ = "cultura"

    id = Column(Integer, primary_key=True, index=True)
    data = Column(Date)
    quantidade = Column(Float)

    colheitas = relationship("Colheita", back_populates="cultura")


class Colheita(Base):
    __tablename__ = "colheita"

    id = Column(Integer, primary_key=True, index=True)
    data = Column(Date)
    quantidade = Column(Float)

    id_cultura = Column(Integer, ForeignKey("cultura.id"))

    cultura = relationship("Cultura", back_populates="colheitas")


class Funcionario(Base):
    __tablename__ = "funcionario"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100))
    funcao = Column(String(100))
    salario = Column(Float)
    cpf = Column(String(20))
    telefone = Column(String(20))

    atividades = relationship("Atividade", back_populates="funcionario")


class Atividade(Base):
    __tablename__ = "atividade"

    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String(100))
    data = Column(Date)

    hora_inicio = Column(TIMESTAMP)
    hora_fim = Column(TIMESTAMP)

    custo_total = Column(Float)
    descricao = Column(String(255))

    id_funcionario = Column(Integer, ForeignKey("funcionario.id"))

    funcionario = relationship("Funcionario", back_populates="atividades")
    insumos = relationship("AtividadeInsumo", back_populates="atividade")
    maquinas = relationship("UsoMaquina", back_populates="atividade")


class Insumo(Base):
    __tablename__ = "insumo"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100))
    tipo = Column(String(100))
    custo = Column(Float)
    quantidade = Column(Float)

    atividades = relationship("AtividadeInsumo", back_populates="insumo")


class AtividadeInsumo(Base):
    __tablename__ = "atividade_insumo"

    id = Column(Integer, primary_key=True, index=True)

    id_atividade = Column(Integer, ForeignKey("atividade.id"))
    id_insumo = Column(Integer, ForeignKey("insumo.id"))

    quantidade = Column(Float)
    custo = Column(Float)
    unidade_medida = Column(String(50))

    atividade = relationship("Atividade", back_populates="insumos")
    insumo = relationship("Insumo", back_populates="atividades")


class Maquina(Base):
    __tablename__ = "maquina"

    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String(100))
    modelo = Column(String(100))
    custo_hora = Column(Float)
    ano = Column(Integer)
    status = Column(String(50))

    atividades = relationship("UsoMaquina", back_populates="maquina")


class UsoMaquina(Base):
    __tablename__ = "uso_maquina"

    id = Column(Integer, primary_key=True, index=True)

    id_atividade = Column(Integer, ForeignKey("atividade.id"))
    id_maquina = Column(Integer, ForeignKey("maquina.id"))

    horas_uso = Column(Time)

    atividade = relationship("Atividade", back_populates="maquinas")
    maquina = relationship("Maquina", back_populates="atividades")