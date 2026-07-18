from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.models.request_models import SummaryRequest
from app.services.llm_service import stream_summary

router = APIRouter(
    prefix="/summarizer",
    tags=["Summarizer"]
)


@router.post("/stream")
async def summarize(request: SummaryRequest):

    return StreamingResponse(
        stream_summary(request.transcript),
        media_type="text/plain",
    )