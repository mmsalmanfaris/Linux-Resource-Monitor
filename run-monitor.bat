@echo off
REM ================================================
REM Linux Resource Monitor Launcher (Windows)
REM Author: Salman Faris
REM Version: v1.1
REM ================================================

REM ─── 1. Ensure we're in the repo root ─────────────
pushd %~dp0

REM ─── 2. Make sure Python is available ─────────────
where py >nul 2>&1
IF ERRORLEVEL 1 (
  echo Python launcher (py) not found, installing via Chocolatey...
  choco install -y python
  goto :WAIT_PY
) ELSE (
  echo Python launcher found.
)
:WAIT_PY
timeout /t 5 >nul

REM ─── 3. Start Backend ─────────────────────────────
echo Starting backend...
pushd backend

REM Create & activate venv
py -3 -m venv venv
call venv\Scripts\activate.bat

REM Upgrade pip and install requirements
py -3 -m pip install --upgrade pip
py -3 -m pip install -r requirements.txt

REM Launch Uvicorn in new window
start "Backend" cmd /k "call venv\Scripts\activate.bat && py -3 -m uvicorn main:app --host 0.0.0.0 --port 8000"

popd

REM ─── 4. Start Frontend ────────────────────────────
echo Starting frontend...
pushd frontend

REM Install npm deps (if needed)
npm install

REM Launch React/Vite in new window
start "Frontend" cmd /k "npm run dev"

popd

REM ─── 5. Open Browser ──────────────────────────────
echo Waiting for the dev server to start...
timeout /t 5 >nul
start "" "http://localhost:5173"

popd

echo All done!
