from google import genai
from google.genai import types

from app.core.config import GEMINI_API_KEY
from app.core.prompts import PLANNER_PROMPT
from app.models.planner_models import PlannerResponse
from app.core.prompts import SUMMARY_PROMPT , PRIORITIZER_PROMPT
from app.models.prioritizer_models import PrioritizerResponse
from app.models.request_models import SummaryResponse

import json
from datetime import date



client = genai.Client(api_key=GEMINI_API_KEY)

MODEL_NAME = "gemini-2.5-flash"


def generate_planner(user_input: str):

    prompt = PLANNER_PROMPT.format(
        user_input=user_input
    )

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=PlannerResponse,
        ),
    )

    return response.parsed



def generate_summary(transcript: str):

    prompt = SUMMARY_PROMPT.format(
    current_date=date.today().isoformat(),
    transcript=transcript,
)

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=SummaryResponse,
        ),
    )

    return response.parsed

def generate_priorities(existing_tasks: list, new_tasks: list):
    

    prompt = PRIORITIZER_PROMPT.format(
        existing_tasks=json.dumps(existing_tasks, indent=2),
        new_tasks=json.dumps(new_tasks, indent=2),
    )

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=PrioritizerResponse,
        ),
    )

    return response.parsed