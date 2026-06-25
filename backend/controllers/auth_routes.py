from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from db import conectar

router_auth = APIRouter(
    prefix='/auth',
    tags=['Autenticação']
)

SECRET_KEY = "sua-chave-secreta-aqui"  # essa também deveria vir do .env
ALGORITHM = "HS256"
EXPIRACAO_MINUTOS = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Login(BaseModel):
    email: EmailStr
    senha: str


class TokenResponse(BaseModel):
    token: str
    usuario: str


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