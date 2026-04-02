from fastapi import APIRouter

router_auth = APIRouter(prefix="/auth")

@router_auth.post("/users")
def cadastrar_usuario():
    pass

@router_auth.post("/sessions")
def create_session():
    pass

@router_auth.get("/users/me")
def get_me():
    pass