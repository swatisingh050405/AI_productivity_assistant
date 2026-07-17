from pydantic import BaseModel


class ScheduleItem(BaseModel):
    start_time: str
    end_time: str
    task: str


class PlannerResponse(BaseModel):
    schedule: list[ScheduleItem]