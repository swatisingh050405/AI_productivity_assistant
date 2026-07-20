from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database.database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    description = Column(String, default="")

    priority = Column(String, default="Medium")

    deadline = Column(String, default="")      # e.g. Today, Tomorrow, 25 July

    task_date = Column(String, default="")     # Planner date (Today's date)

    status = Column(String, default="Pending")

    source = Column(String, default="Planner") # Planner / Summary / Prioritizer

    created_at = Column(DateTime, default=datetime.utcnow)

    completed_at = Column(DateTime, nullable=True)