from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date

from app.database.database import get_db
from app.models.request_models import PlannerSaveRequest
from app.crud.task_crud import (
    create_task,
    delete_planner_tasks,
    get_all_tasks,
    get_pending_tasks,
    mark_task_completed,
    delete_task,
    get_dashboard_tasks,
)
from app.core.security import get_current_user_optional
from app.models.user_model import User

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
)


@router.get("/")
def all_tasks(
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
):
    if current_user is None:
        return []

    return get_all_tasks(
        db=db,
        user_id=current_user.id,
    )


@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
):
    if current_user is None:
        return {
            "tasks": [],
            "stats": {
                "total_tasks": 0,
                "completed_tasks": 0,
                "progress": 0,
            },
        }

    today = date.today().isoformat()

    result = get_dashboard_tasks(
        db=db,
        today=today,
        user_id=current_user.id,
    )

   

    return result


@router.post("/planner")
def save_planner(
    request: PlannerSaveRequest,
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
):

    
    if current_user is None:
        return {
            "message": "Guest mode - planner not saved."
        }

    today = date.today().isoformat()

    delete_planner_tasks(
        db=db,
        user_id=current_user.id,
        task_date=today,
    )

    for item in request.schedule:

       

        if not item.is_task:
            continue



        task = create_task(
            db=db,
            user_id=current_user.id,
            title=item.task_name,
            description=item.description,
            priority="Medium",
            deadline=today,
            task_date=today,
            source="Planner",
        )

        

    print("\nPlanner Saved Successfully\n")

    return {
        "message": "Planner saved successfully"
    }




@router.get("/pending")
def pending_tasks(
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
):
    if current_user is None:
        return {
            "pending": [],
        }

    today = date.today().isoformat()

    return get_pending_tasks(
        db=db,
        today=today,
        user_id=current_user.id,
    )


@router.patch("/{task_id}/complete")
def complete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
):
    if current_user is None:
        return {"message": "Login required"}

    return mark_task_completed(
        db=db,
        task_id=task_id,
        user_id=current_user.id,
    )


@router.delete("/{task_id}")
def remove_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
):
    if current_user is None:
        return {"message": "Login required"}

    return delete_task(
        db=db,
        task_id=task_id,
        user_id=current_user.id,
    )