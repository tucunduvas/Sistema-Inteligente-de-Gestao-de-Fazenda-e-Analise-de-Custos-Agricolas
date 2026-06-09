from datetime import date, time
from typing import List, Optional

from sqlalchemy import (
    Date, Float, ForeignKey, Integer, String, Time, TIMESTAMP
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass

class Fazenda(Base):
    __tablename__ = "fazenda"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    nome: Mapped[Optional[str]] = mapped_column(String(100))
    localizacao: Mapped[Optional[str]] = mapped_column(String(150))
    areaTotal: Mapped[Optional[float]] = mapped_column(Float)

    talhoes: Mapped[List["Talhao"]] = relationship("Talhao", back_populates="fazenda")

class Talhao(Base):
    __tablename__ = "talhao"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    area: Mapped[Optional[int]] = mapped_column(Integer)
    tipoCultura: Mapped[Optional[str]] = mapped_column(String(100))
    idade: Mapped[Optional[int]] = mapped_column(Integer)
    volumeEstimado: Mapped[Optional[float]] = mapped_column(Float)
    idFazenda: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("fazenda.id"))
    fazenda: Mapped[Optional["Fazenda"]] = relationship("Fazenda", back_populates="talhoes")
    plantios: Mapped[List["Plantio"]] = relationship("Plantio", back_populates="talhao")

class Safra(Base):
    __tablename__ = "safra"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    inicio: Mapped[Optional[date]] = mapped_column(Date)
    fim: Mapped[Optional[date]] = mapped_column(Date)

    plantios: Mapped[List["Plantio"]] = relationship("Plantio", back_populates="safra")


class Plantio(Base):
    __tablename__ = "plantio"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    data: Mapped[Optional[date]] = mapped_column(Date)
    idSafra: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("safra.id"))
    idTalhao: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("talhao.id"))

    safra: Mapped[Optional["Safra"]] = relationship("Safra", back_populates="plantios")
    talhao: Mapped[Optional["Talhao"]] = relationship("Talhao", back_populates="plantios")

class Cultura(Base):
    __tablename__ = "cultura"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    data: Mapped[Optional[date]] = mapped_column(Date)
    quantidade: Mapped[Optional[float]] = mapped_column(Float)

    colheitas: Mapped[List["Colheita"]] = relationship("Colheita", back_populates="cultura")

class Colheita(Base):
    __tablename__ = "colheita"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    data: Mapped[Optional[date]] = mapped_column(Date)
    quantidade: Mapped[Optional[float]] = mapped_column(Float)
    idCultura: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("cultura.id"))

    cultura: Mapped[Optional["Cultura"]] = relationship("Cultura", back_populates="colheitas")

class Funcionario(Base):
    __tablename__ = "funcionario"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    nome: Mapped[Optional[str]] = mapped_column(String(100))
    funcao: Mapped[Optional[str]] = mapped_column(String(100))
    salario: Mapped[Optional[float]] = mapped_column(Float)
    cpf: Mapped[Optional[str]] = mapped_column(String(20))
    telefone: Mapped[Optional[str]] = mapped_column(String(20))

    atividades: Mapped[List["Atividade"]] = relationship("Atividade", back_populates="funcionario")

class Atividade(Base):
    __tablename__ = "atividade"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    tipo: Mapped[Optional[str]] = mapped_column(String(100))
    data: Mapped[Optional[date]] = mapped_column(Date)
    horaInicio: Mapped[Optional[date]] = mapped_column(TIMESTAMP)
    horaFim: Mapped[Optional[date]] = mapped_column(TIMESTAMP)
    custoTotal: Mapped[Optional[float]] = mapped_column(Float)
    descricao: Mapped[Optional[str]] = mapped_column(String(255))
    idFuncionario: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("funcionario.id"))

    funcionario: Mapped[Optional["Funcionario"]] = relationship("Funcionario", back_populates="atividades")
    insumos: Mapped[List["AtividadeInsumo"]] = relationship("AtividadeInsumo", back_populates="atividade")
    uso_maquinas: Mapped[List["UsoMaquina"]] = relationship("UsoMaquina", back_populates="atividade")

class Insumo(Base):
    __tablename__ = "insumo"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    nome: Mapped[Optional[str]] = mapped_column(String(100))
    tipo: Mapped[Optional[str]] = mapped_column(String(100))
    custo: Mapped[Optional[float]] = mapped_column(Float)
    quantidade: Mapped[Optional[float]] = mapped_column(Float)

    atividades: Mapped[List["AtividadeInsumo"]] = relationship("AtividadeInsumo", back_populates="insumo")

class AtividadeInsumo(Base):
    __tablename__ = "atividadeinsumo"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    idAtividade: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("atividade.id"))
    idInsumo: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("insumo.id"))
    quantidade: Mapped[Optional[float]] = mapped_column(Float)
    custo: Mapped[Optional[float]] = mapped_column(Float)
    unidadeMedida: Mapped[Optional[str]] = mapped_column(String(50))

    atividade: Mapped[Optional["Atividade"]] = relationship("Atividade", back_populates="insumos")
    insumo: Mapped[Optional["Insumo"]] = relationship("Insumo", back_populates="atividades")

class Maquina(Base):
    __tablename__ = "maquina"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    tipo: Mapped[Optional[str]] = mapped_column(String(100))
    modelo: Mapped[Optional[str]] = mapped_column(String(100))
    custoHora: Mapped[Optional[float]] = mapped_column(Float)
    ano: Mapped[Optional[int]] = mapped_column(Integer)
    status: Mapped[Optional[str]] = mapped_column(String(50))

    uso_maquinas: Mapped[List["UsoMaquina"]] = relationship("UsoMaquina", back_populates="maquina")

class UsoMaquina(Base):
    __tablename__ = "usomaquina"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    idAtividade: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("atividade.id"))
    idMaquina: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("maquina.id"))
    horasUso: Mapped[Optional[time]] = mapped_column(Time)

    atividade: Mapped[Optional["Atividade"]] = relationship("Atividade", back_populates="uso_maquinas")
    maquina: Mapped[Optional["Maquina"]] = relationship("Maquina", back_populates="uso_maquinas")
