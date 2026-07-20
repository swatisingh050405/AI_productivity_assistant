from sqlalchemy.orm import Session

from app.models.task_models import Task
from datetime import datetime, timedelta



def create_task(
    db: Session,
    title: str,
    description: str = "",
    priority: str = "Medium",
    deadline: str = "",
    task_date: str = "",
    source: str = "Planner",
):
    # Planner tasks
    if task_date:
        existing = (
            db.query(Task)
            .filter(
                Task.title == title,
                Task.task_date == task_date,
                Task.status == "Pending",
            )
            .first()
        )
    # Summary / Prioritizer tasks
    else:
        existing = (
            db.query(Task)
            .filter(
                Task.title == title,
                Task.deadline == deadline,
                Task.status == "Pending",
            )
            .first()
        )

    if existing:
        return existing

    task = Task(
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


def delete_planner_tasks(db: Session, task_date: str):
    planner_tasks = (
        db.query(Task)
        .filter(
            Task.source == "Planner",
            Task.task_date == task_date,
            Task.status == "Pending",
        )
        .all()
    )

    for task in planner_tasks:
        db.delete(task)

    db.commit()


def get_all_tasks(db: Session):
    return db.query(Task).all()


def get_pending_tasks(
    db: Session,
    today: str,
    recent_date: str,
):
    tasks = (
        db.query(Task)
        .filter(Task.status == "Pending")
        .all()
    )

    result = []

    for task in tasks:

        # Today's planner tasks
        if task.task_date == today:
            result.append(task)
            continue

        # Tasks whose deadline is today or overdue
        if task.deadline and task.deadline <= today:
            result.append(task)
            continue

        # Recently created tasks (last 2 days) having future deadline
        if (
            task.task_date
            and recent_date <= task.task_date <= today
        ):
            result.append(task)

    return result



def get_dashboard_tasks(db: Session, today: str):

    # All tasks that belong to today or are overdue
    all_tasks = (
        db.query(Task)
        .filter(
            (Task.task_date == today) |
            ((Task.deadline != "") & (Task.deadline <= today))
        )
        .all()
    )

    pending_tasks = [
        task for task in all_tasks
        if task.status == "Pending"
    ]

    priority_order = {
        "High": 0,
        "Medium": 1,
        "Low": 2,
    }

    # Overdue High → High → Medium → Low
    pending_tasks.sort(
        key=lambda task: (
            task.priority != "High",
            not (task.deadline and task.deadline < today),
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


def mark_task_completed(db: Session, task_id: int):
    task = (
        db.query(Task)
        .filter(Task.id == task_id)
        .first()
    )

    if not task:
        return None

    task.status = "Completed"

    db.commit()
    db.refresh(task)

    return task


def delete_task(db: Session, task_id: int):
    task = (
        db.query(Task)
        .filter(Task.id == task_id)
        .first()
    )

    if not task:
        return False

    db.delete(task)
    db.commit()

    return True


def update_priorities(db: Session, prioritized_tasks: list):
    for item in prioritized_tasks:

        task = (
            db.query(Task)
            .filter(
                Task.title == item.task,
                Task.status == "Pending",
            )
            .first()
        )

        if task:
            task.priority = item.priority

    db.commit()