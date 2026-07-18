from fastapi import APIRouter

from app.models.request_models import PrioritizerRequest
from app.services.llm_service import generate_priorities

router = APIRouter(
    prefix="/prioritizer",
    tags=["Prioritizer"]
)


@router.post("/")
async def prioritize(request: PrioritizerRequest):

    result = generate_priorities(request.tasks)

    return result.model_dump()