from pydantic import BaseModel


class PlannerRequest(BaseModel):
    text: str