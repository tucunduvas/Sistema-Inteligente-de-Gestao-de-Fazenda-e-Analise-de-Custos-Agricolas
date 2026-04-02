from fastapi import APIRouter

router_dashboard = APIRouter(prefix="/dashboard")


@router_dashboard.get('/')
def visualizar_dashboard():
    pass

