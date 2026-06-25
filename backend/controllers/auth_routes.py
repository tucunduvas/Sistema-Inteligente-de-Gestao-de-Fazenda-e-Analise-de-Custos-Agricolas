import os
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from dotenv import load_dotenv
from db import conectar
import psycopg2

load_dotenv()

router_auth = APIRouter(
    prefix='/auth',
    tags=['Autenticação']
)

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
EXPIRACAO_MINUTOS = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


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


def buscar_usuario_por_email(email: str):
    conexao = conectar()
    try:
        with conexao.cursor() as cur:
            cur.execute(
                "SELECT email, senha_hash FROM usuarios WHERE email = %s",
                (email,)
            )
            return cur.fetchone()
    finally:
        conexao.close()


def criar_token(email: str) -> str:
    payload = {
        "sub": email,
        "exp": datetime.utcnow() + timedelta(minutes=EXPIRACAO_MINUTOS)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


@router_auth.post('/cadastro', response_model=UsuarioResponse, status_code=status.HTTP_201_CREATED)
def cadastrar(dados: Cadastro):
    senha_hash = pwd_context.hash(dados.senha)

    conexao = conectar()
    try:
        with conexao.cursor() as cursor:
            try:
                cursor.execute(
                    """
                    INSERT INTO usuarios (email, senha_hash)
                    VALUES (%s, %s)
                    RETURNING id, email
                    """,
                    (dados.email, senha_hash)
                )
                novo_usuario = cursor.fetchone()
                conexao.commit()
            except psycopg2.errors.UniqueViolation:
                conexao.rollback()
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Email já cadastrado"
                )

        return UsuarioResponse(id=novo_usuario[0], email=novo_usuario[1])
    except HTTPException:
        raise
    except Exception as e:
        conexao.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao cadastrar: {e}")
    finally:
        conexao.close()


@router_auth.post('/login', response_model=TokenResponse)
def login(dados: Login):
    usuario = buscar_usuario_por_email(dados.email)

    if not usuario:
        raise HTTPException(status_code=401, detail="Email ou senha inválidos")

    email_db, senha_hash = usuario

    if not pwd_context.verify(dados.senha, senha_hash):
        raise HTTPException(status_code=401, detail="Email ou senha inválidos")

    token = criar_token(email_db)

    return TokenResponse(token=token, usuario=email_db)