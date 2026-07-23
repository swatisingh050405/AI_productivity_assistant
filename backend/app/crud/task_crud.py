from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime ,timedelta

from app.models.task_models import Task


def create_task(
    db: Session,
    user_id: int,
    title: str,
    description: str = "",
    priority: str = "Medium",
    deadline: str = "",
    task_date: str = "",
    source: str = "Planner",
):

    if task_date:
        existing = (
            db.query(Task)
            .filter(
                Task.user_id == user_id,
                Task.title == title,
                Task.task_date == task_date,
                Task.status == "Pending",
            )
            .first()
        )
    else:
        existing = (
            db.query(Task)
            .filter(
                Task.user_id == user_id,
                Task.title == title,
                Task.deadline == deadline,
                Task.status == "Pending",
            )
            .first()
        )

    if existing:
        return existing

    task = Task(
        user_id=user_id,
        title=title,
        description=description,
        priority=priority,
        deadline=deadline,
        task_date=task_date,
        source=source,
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task


def delete_planner_tasks(
    db: Session,
    user_id: int | None,
    task_date: str,
):
    planner_tasks = (
        db.query(Task)
        .filter(
            Task.user_id == user_id,
            Task.source == "Planner",
            Task.task_date == task_date,
            Task.status == "Pending",
        )
        .all()
    )

    for task in planner_tasks:
        db.delete(task)

    db.commit()


def get_all_tasks(
    db: Session,
   user_id: int | None,

):
    return (
        db.query(Task)
        .filter(Task.user_id == user_id)
        .all()

    )


def get_prioritizer_tasks(
    db: Session,
    user_id: int,
    today: str,
):
    return (
        db.query(Task)
        .filter(
            Task.user_id == user_id,
            Task.status == "Pending",
            (
                (func.date(Task.created_at) == today)
                |
                (Task.deadline == today)
            )
        )
        .all()
    )

def get_pending_tasks(
    db: Session,
    user_id: int | None,
    today: str,
):
    week_ago = (
        date.fromisoformat(today) - timedelta(days=7)
    ).isoformat()

    pending_tasks = (
        db.query(Task)
        .filter(
            Task.user_id == user_id,
            Task.status == "Pending",
            func.date(Task.created_at) >= week_ago,
            func.date(Task.created_at) < today,
        )
        .order_by(Task.created_at.desc())
        .all()
    )

    return {
        "pending": pending_tasks,
    }


def get_dashboard_tasks(
    db: Session,
    today: str,
    user_id: int | None,
):

    if user_id is None:
        return {
            "tasks": [],
            "stats": {
                "total_tasks": 0,
                "completed_tasks": 0,
                "progress": 0,
            },
        }

    all_tasks = (
        db.query(Task)
        .filter(
            Task.user_id == user_id,
            func.date(Task.created_at) == today,
        )
        .all()
    )

    pending_tasks = [
        task
        for task in all_tasks
        if task.status == "Pending"
    ]

    priority_order = {
        "High": 0,
        "Medium": 1,
        "Low": 2,
    }

    pending_tasks.sort(
        key=lambda task: (
            priority_order.get(task.priority, 3),
            task.deadline or "9999-12-31",
        )
    )

    def weight(priority):
        return {
            "High": 3,
            "Medium": 2,
            "Low": 1,
        }.get(priority, 1)

    total_score = sum(weight(task.priority) for task in all_tasks)

    completed_score = sum(
        weight(task.priority)
        for task in all_tasks
        if task.status == "Completed"
    )

    progress = (
        round((completed_score / total_score) * 100)
        if total_score > 0
        else 0
    )

    return {
        "tasks": pending_tasks,
        "stats": {
            "total_tasks": len(all_tasks),
            "completed_tasks": len(
                [t for t in all_tasks if t.status == "Completed"]
            ),
            "progress": progress,
        },
    }


def mark_task_completed(
    db: Session,
    task_id: int,
    user_id: int | None,
):
    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.user_id == user_id,
        )
        .first()
    )

    if not task:
        return None

    task.status = "Completed"
    task.completed_at = datetime.utcnow()

    db.commit()
    db.refresh(task)

    return task


def delete_task(
    db: Session,
    task_id: int,
    user_id: int | None,
):
    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.user_id == user_id,
        )
        .first()
    )

    if not task:
        return False

    db.delete(task)
    db.commit()

    return True


def update_priorities(
    db: Session,
    prioritized_tasks: list,
    user_id: int | None,
):
    for item in prioritized_tasks:

        task = (
            db.query(Task)
            .filter(
                Task.user_id == user_id,
                Task.title == item.task,
                Task.status == "Pending",
            )
            .first()
        )

        if task:
            task.priority = item.priority

    db.commit()