#!/bin/bash
set -xeo pipefail

#####################################
# Script to run the Linux Resource Monitor
# Author: Salman Faris
# Version: v1.0
# Description: This script clones the Linux Resource Monitor repository and runs both backend and frontend.
#####################################

# ----------------------
# Run Backend
# ----------------------
cd backend

pip install -r requirements.txt

uvicorn main:app --host 0.0.0.0 --port 8000 &

# ----------------------
# Run Frontend
# ----------------------
cd ../frontend

npm install

npm run dev &

sleep 2

xdg-open http://localhost:5173
