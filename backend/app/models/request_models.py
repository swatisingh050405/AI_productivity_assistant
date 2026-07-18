from pydantic import BaseModel


class PlannerRequest(BaseModel):
    text: str


class SummaryRequest(BaseModel):
    transcript: str

class PrioritizerRequest(BaseModel):
    tasks: str