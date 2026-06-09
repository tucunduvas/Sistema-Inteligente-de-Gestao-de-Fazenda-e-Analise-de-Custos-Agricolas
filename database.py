from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# DATABASE_URL = "postgresql://usuario:senha@localhost:5432/meubanco"
# "postgresql://postgres:1234@localhost:5432/fazendas_db"
DATABASE_URL = "postgres://gabri:220328/sigfaz"  

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()


