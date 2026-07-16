import os

folders = [
    "backend/app/api",
    "backend/app/core",
    "backend/app/models",
    "backend/app/services",
    "backend/app/utils",
    "backend/logs",

    "frontend/public",
    "frontend/src/assets",
    "frontend/src/components",
    "frontend/src/pages",
    "frontend/src/hooks",
    "frontend/src/services",
    "frontend/src/styles",
]

files = [
    "backend/app/main.py",

    "backend/app/api/planner.py",
    "backend/app/api/summarizer.py",
    "backend/app/api/prioritizer.py",
    "backend/app/api/health.py",

    "backend/app/core/config.py",
    "backend/app/core/prompts.py",

    "backend/app/models/request_models.py",

    "backend/app/services/llm_service.py",

    "backend/app/utils/helpers.py",

    "backend/.env",
    "backend/requirements.txt",
    "backend/Dockerfile",

    "frontend/src/App.jsx",
    "frontend/src/main.jsx",

    "frontend/Dockerfile",

    "docker-compose.yml",

    
    "README.md",
    "setup.py",
]

for folder in folders:
    os.makedirs(folder, exist_ok=True)

for file in files:
    with open(file, "w") as f:
        pass

print("Project structure created successfully!")