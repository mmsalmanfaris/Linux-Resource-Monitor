@echo off
REM ===============================
REM Linux Resource Monitor Launcher
REM Author: Salman Faris
REM Version: v1.1
REM Windows OS
REM ===============================

REM Move to backend and setup Python env
cd backend
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt
start cmd /k "uvicorn main:app --host 0.0.0.0 --port 8000"

REM Move to frontend and start React
cd ..\frontend
npm install
start cmd /k "npm run dev"

REM Open browser
timeout /t 2 >nul
start http://localhost:5173
