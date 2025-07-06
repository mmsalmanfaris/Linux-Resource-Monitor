#!/bin/bash
set -eo pipefail

#####################################
# Linux Resource Monitor Launcher
# Author: Salman Faris
# Version: v1.1
# Cross-platform script (Linux/macOS/WSL)
#####################################

# ------------- BACKEND -------------
cd backend || exit 1

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 &

# ------------- FRONTEND -------------
cd ../frontend || exit 1

npm install
npm run dev &

# ------------- OPEN IN BROWSER -------------
sleep 2

case "$OSTYPE" in
  linux*)
    if command -v xdg-open >/dev/null && [ -n "$DISPLAY" ]; then
      xdg-open http://localhost:5173
    else
      echo "Linux (no GUI): Open your browser and go to http://localhost:5173"
    fi
    ;;
  darwin*)  # macOS
    open http://localhost:5173
    ;;
  cygwin* | msys* | win32)
    start http://localhost:5173
    ;;
  *)
    echo "Unknown OS: Please open your browser and go to http://localhost:5173"
    ;;
esac

