from google import genai
from google.genai import types

from app.core.config import GEMINI_API_KEY
from app.core.prompts import PLANNER_PROMPT
from app.models.planner_models import PlannerResponse
from app.core.prompts import SUMMARY_PROMPT , PRIORITIZER_PROMPT
from app.models.prioritizer_models import PrioritizerResponse


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



def stream_summary(transcript: str):

    prompt = SUMMARY_PROMPT.format(
        transcript=transcript
    )

    stream = client.models.generate_content_stream(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    for chunk in stream:
        if chunk.text:
            yield chunk.text


def generate_priorities(tasks: str):

    prompt = PRIORITIZER_PROMPT.format(tasks=tasks)

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=PrioritizerResponse,
        ),
    )

    return response.parsed