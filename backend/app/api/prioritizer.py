from datetime import date, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.request_models import PrioritizerRequest
from app.services.llm_service import generate_priorities
from app.crud.task_crud import (
    get_pending_tasks,
    create_task,
    update_priorities,
)
from app.core.security import get_current_user_optional

from app.models.user_model import User

router = APIRouter(
    prefix="/prioritizer",
    tags=["Prioritizer"],
)


@router.post("/")
async def prioritize(
    request: PrioritizerRequest,
    db: Session = Depends(get_db),
    
current_user: User | None = Depends(get_current_user_optional),
):

    # Get relevant pending tasks
    today = date.today()
    two_days_ago = today - timedelta(days=2)

    if current_user:
        existing = get_pending_tasks(
            db=db,
            user_id=current_user.id,
            today=today.isoformat(),
            recent_date=two_days_ago.isoformat(),
        )
    else:
        existing = []

    existing_tasks = [
        {
            "task": task.title,
            "description": task.description,
            "deadline": task.deadline,
        }
        for task in existing
    ]

    # Save new tasks
    new_tasks = []

    for task in request.new_tasks:

        task_data = {
            "task": task.title,
            "description": task.description,
            "deadline": task.deadline,
        }

        new_tasks.append(task_data)

        if current_user:
            create_task(
                db=db,
                user_id=current_user.id,
                title=task.title,
                description=task.description,
                deadline=task.deadline,
                task_date=task.task_date,
                source="Prioritizer",
            )

    # Include newly added tasks while prioritizing
    all_tasks = existing_tasks + new_tasks

    # Generate priorities
    result = generate_priorities(
        existing_tasks=all_tasks,
        new_tasks=[],
    )

    # Update priorities in database
    if current_user:
        update_priorities(
            db=db,
            user_id=current_user.id,
            prioritized_tasks=result.tasks,
        )

    return result.model_dump()