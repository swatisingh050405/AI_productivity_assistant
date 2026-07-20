from pydantic import BaseModel


class ScheduleItem(BaseModel):
    start_time: str
    end_time: str
    duration: str
    task_name: str
    description: str
    is_task: bool


class DailySummary(BaseModel):
    focus_time: str
    break_time: str
    total_tasks: int
    productivity_score: str


class PlannerResponse(BaseModel):
    schedule: list[ScheduleItem]
    insights: list[str]
    summary: DailySummary