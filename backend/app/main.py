from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.planner import router as planner_router

app = FastAPI(title="ProdigyAI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(planner_router)


@app.get("/")
def home():
    return {"message": "Backend Running"}