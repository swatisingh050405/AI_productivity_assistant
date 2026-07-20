from pydantic import BaseModel


class TaskItem(BaseModel):
    task:str
    priority: str
    order: int
    reason: str


class PrioritizerResponse(BaseModel):
    tasks: list[TaskItem]