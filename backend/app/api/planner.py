from fastapi import APIRouter

from app.models.request_models import PlannerRequest
from app.services.llm_service import generate_planner

router = APIRouter(
    prefix="/planner",
    tags=["Planner"],
)


@router.post("/", response_model=dict)
async def planner(request: PlannerRequest):
    result = generate_planner(request.text)
    return result.model_dump()