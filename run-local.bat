@echo off

echo Launching backend
start cmd /k ".venv\Scripts\activate && python backend/main.py"

echo Launching frontend
start cmd /k "cd frontend && npm run dev"
