from google import genai
from google.genai import types

from app.core.config import GEMINI_API_KEY
from app.core.prompts import PLANNER_PROMPT
from app.models.planner_models import PlannerResponse

client = genai.Client(api_key=GEMINI_API_KEY)


def generate_planner(user_input: str):

    prompt = PLANNER_PROMPT.format(
        user_input=user_input
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=PlannerResponse,
        ),
    )

    return response.parsed