from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date

from app.database.database import get_db
from app.models.request_models import (
    CreateTaskRequest,
    PlannerSaveRequest,
)
from app.crud.task_crud import (
    create_task,
    delete_planner_tasks,
    get_all_tasks,
    get_pending_tasks,
    mark_task_completed,
    delete_task,
)
from app.crud.task_crud import get_dashboard_tasks

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
)


@router.get("/")
def all_tasks(db: Session = Depends(get_db)):
    return get_all_tasks(db)

@router.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):
    today = date.today().isoformat()

    return get_dashboard_tasks(
        db=db,
        today=today,
    )

@router.post("/planner")
def save_planner(request: PlannerSaveRequest, db: Session = Depends(get_db)):

    today = date.today().isoformat()

    delete_planner_tasks(
        db=db,
        task_date=today,
    )

    for item in request.schedule:

        if not item.is_task:
            continue

        create_task(
            db=db,
            title=item.task_name,
            description=item.description,
            priority="Medium",
            deadline=today,
            task_date=today,
            source="Planner",
        )

    return {
        "message": "Planner saved successfully"
    }


@router.get("/pending")
def pending_tasks(db: Session = Depends(get_db)):
    return get_pending_tasks(db, today, recent_date)


@router.patch("/{task_id}/complete")
def complete_task(task_id: int, db: Session = Depends(get_db)):
    return mark_task_completed(db, task_id)


@router.delete("/{task_id}")
def remove_task(task_id: int, db: Session = Depends(get_db)):
    return delete_task(db, task_id)