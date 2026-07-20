from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.request_models import SummaryRequest
from app.services.llm_service import generate_summary
from app.crud.task_crud import create_task

router = APIRouter(
    prefix="/summarizer",
    tags=["Summarizer"],
)


@router.post("/")
def summarize(
    request: SummaryRequest,
    db: Session = Depends(get_db),
):

    result = generate_summary(request.transcript)

    for item in result.highlights:

        if not item.track:
            continue

        create_task(
            db=db,
            title=item.text,
            description="Generated from Meeting Summary",
            priority="Medium",
            deadline=item.deadline,
            source="Meeting",
        )

    return result.model_dump()