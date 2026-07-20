from pydantic import BaseModel



# ---------- Task ----------

class CreateTaskRequest(BaseModel):
    title: str
    description: str = ""
    priority: str = "Medium"
    deadline: str = ""
    task_date: str = ""
    source: str = "Planner"

# ---------- Planner ----------

class PlannerRequest(BaseModel):
    text: str


class PlannerTask(BaseModel):
    task_name: str
    description: str
    start_time: str
    end_time: str
    duration: str
    is_task: bool


class PlannerSaveRequest(BaseModel):
    schedule: list[PlannerTask]


# ---------- Summarizer ----------

class SummaryRequest(BaseModel):
    transcript: str


class SummaryData(BaseModel):
    overview: str
    key_points: list[str]
    decisions: list[str]
    next_steps: list[str]


class HighlightItem(BaseModel):
    text: str
    deadline: str
    track: bool


class SummaryResponse(BaseModel):
    summary: SummaryData
    highlights: list[HighlightItem]


# ---------- Prioritizer ----------

class NewTaskInput(BaseModel):
    title: str
    description: str = ""
    deadline: str = ""
    task_date: str = ""
    created_at: str = ""
      



class PrioritizerRequest(BaseModel):
    new_tasks: list[NewTaskInput]


class DashboardStats(BaseModel):
    total_tasks: int
    completed_tasks: int
    progress: int


class DashboardResponse(BaseModel):
    tasks: list
    stats: DashboardStats