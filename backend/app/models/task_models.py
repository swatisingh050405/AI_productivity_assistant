from sqlalchemy import Column, Integer, String, DateTime , Date
from sqlalchemy import ForeignKey
from datetime import datetime 

from app.database.database import Base


class Task(Base):
    __tablename__ = "tasks"

    user_id = Column(Integer,ForeignKey("users.id"),nullable=False,)

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    description = Column(String, default="")

    priority = Column(String, default="Medium")

    deadline = Column(String , default="")      # Planner date (Today's date) / Summary

    task_date = Column(String , default="")    # Planner date (Today's date)

    status = Column(String, default="Pending")

    source = Column(String, default="Planner") # Planner / Summary / Prioritizer

    created_at = Column(DateTime, default=datetime.utcnow)

    completed_at = Column(DateTime, nullable=True)