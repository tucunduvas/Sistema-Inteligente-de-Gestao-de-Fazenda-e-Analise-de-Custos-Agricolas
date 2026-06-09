
# # 🔌 1. Instalar dependências

# No terminal:

# ```bash
# pip install sqlalchemy psycopg2-binary
# ```

# Se quiser versão async depois, você usa `asyncpg`.

# ---


# Ela conecta seu código ao banco:

# ```python
# DATABASE_URL = "postgresql://usuario:senha@localhost:5432/meubanco"
# ```

# Exemplo real:

# ```python
# DATABASE_URL = "postgresql://postgres:1234@localhost:5432/fazendas_db"
# ```

# ---

# # ⚙️ 3. Criar conexão com o banco

# Crie um arquivo `database.py`:

# ```python
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker

# DATABASE_URL = "postgresql://postgres:1234@localhost:5432/fazendas_db"

# engine = create_engine(DATABASE_URL)

# SessionLocal = sessionmaker(
#     autocommit=False,
#     autoflush=False,
#     bind=engine
# )
# ```

# ---

# # 🧱 4. Criar modelo (tabela)

# ```python
# from sqlalchemy import Column, Integer, String, Float
# from database import Base
# from sqlalchemy.orm import declarative_base

# Base = declarative_base()

# class Fazenda(Base):
#     __tablename__ = "fazendas"

#     id = Column(Integer, primary_key=True, index=True)
#     nome = Column(String)
#     localizacao = Column(String)
#     area_total_hectares = Column(Float)
# ```

# ---

# # 🗄️ 5. Criar as tabelas no banco

# No `main.py`:

# ```python
# from database import engine
# from models import Base

# Base.metadata.create_all(bind=engine)
# ```

# ---

# # 🔁 6. Usar no FastAPI (rota)

# ```python
# from fastapi import Depends, APIRouter
# from sqlalchemy.orm import Session
# from database import SessionLocal
# from models import Fazenda

# router = APIRouter()

# # Dependência de conexão
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @router.post("/fazendas")
# def criar_fazenda(nome: str, localizacao: str, area: float, db: Session = Depends(get_db)):
#     nova = Fazenda(
#         nome=nome,
#         localizacao=localizacao,
#         area_total_hectares=area
#     )

#     db.add(nova)
#     db.commit()
#     db.refresh(nova)

#     return nova



# 🧱 Exemplo: Fazenda + Talhão (relação 1:N)



from sqlalchemy import Column, Integer, String, Float
from database import Base
from sqlalchemy.orm import relationship

class Fazenda(Base):
    __tablename__ = "fazendas"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    localizacao = Column(String)
    area_total_hectares = Column(Float)

    # relacionamento (1 fazenda -> vários talhões)
    talhoes = relationship("Talhao", back_populates="fazenda")

## 🌱 Modelo Talhão (com Foreign Key)


from sqlalchemy import Column, Integer, String, Float, ForeignKey
from database import Base
from sqlalchemy.orm import relationship

class Talhao(Base):
    __tablename__ = "talhoes"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    area_hectares = Column(Float)

    # chave estrangeira
    fazenda_id = Column(Integer, ForeignKey("fazendas.id"))

    # relacionamento reverso
    fazenda = relationship("Fazenda", back_populates="talhoes")


# 🔗 O que está acontecendo aqui

ForeignKey("fazendas.id")
  #→ diz que o talhão pertence a uma fazenda

relationship()
# → permite acessar dados relacionados no Python:
talhao.fazenda.nome
fazenda.talhoes


# 🧪 Exemplo usando na prática (FastAPI)

def criar_talhao(db: Session):
    novo = Talhao(
        nome="Talhão A",
        area_hectares=10,
        fazenda_id=1
    )

    db.add(novo)
    db.commit()
    db.refresh(novo)

    return novo

from sqlalchemy.orm import declarative_base
Base = declarative_base()

from database import Base
