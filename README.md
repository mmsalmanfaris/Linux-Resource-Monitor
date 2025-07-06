# 🖥️ Linux Resource Monitor

A modern web-based system monitoring dashboard built with **FastAPI** (backend) and **React + Tailwind** (frontend). Monitor CPU, memory, disk, battery, temperature, network, and more with real-time charts and visuals.



![A modern web-based system monitoring dashboard built with FastAPI (backend) and React + Tailwind (frontend)  Monitor CPU, memory, disk, battery, temperature, network, and more with real-time charts and visuals](https://github.com/user-attachments/assets/3633bf8d-dae8-4797-b669-6dc40a90c43d)



---

## 🌟 Features

- Real-time system metrics (CPU, RAM, Disk, Swap, etc.)
- Beautiful React-based UI with charts and icons
- Battery & temperature monitoring
- Top running processes
- Easy setup script (1-line install!)

---

## ✅ Prerequisites

| OS         | Required Tools                         |
|------------|----------------------------------------|
| **Linux**  | `python3`, `python3-venv`, `npm`, `git` |
| **macOS**  | `brew`, `python3`, `npm`, `git`         |
| **Windows** | `python`, `nodejs`, `git`  |

---

## 🚀 Quick Install (One-Line)

### For Linux / WSL Users

```bash
sudo apt update && sudo apt install -y python3-venv python3-pip npm git && git clone https://github.com/mmsalmanfaris/Linux-Resource-Monitor.git && cd Linux-Resource-Monitor && sed -i 's/\r$//' run-monitor.sh && chmod +x run-monitor.sh && ./run-monitor.sh
```

### For macOS Users

> Make sure you have Homebrew installed. If python3 -m venv fails, run: brew install python@3.x and link it correctly.
```
brew install python npm git && git clone https://github.com/mmsalmanfaris/Linux-Resource-Monitor.git && cd Linux-Resource-Monitor && chmod +x run-monitor.sh && ./run-monitor.sh
```

### For Windows (No WSL) Users

> Make sure you're using **PowerShell as Administrator**

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1')) && choco install -y git python nodejs && git clone https://github.com/mmsalmanfaris/Linux-Resource-Monitor.git && cd Linux-Resource-Monitor && ./run-monitor.bat
```

---

## 🌐 Access the dashboard
After running the script, the frontend opens automatically at:
```
http://localhost:5173
```

The backend API is hosted at:
```
http://localhost:8000
```

---

## 🛑 Stop the Monitor
If you close the terminal, the backend may still run in the background. Use the following command to stop all monitor-related processes:
### Linux/MacOS
```
pkill -f "uvicorn main:app" && pkill -f "vite"
```
Or if you want to stop everything running on ports 8000 or 5173:
```
sudo lsof -ti:8000,5173 | xargs kill -9
```
### Windows 
```
taskkill /IM uvicorn.exe /F & taskkill /IM node.exe /F
```


## 📂 Project Structure
```
Linux-Resource-Monitor/
├── backend/         # FastAPI backend (system stats API)
├── frontend/        # React + Tailwind frontend (dashboard UI)
├── run-monitor.sh   # Script for linux/wsl
├── run-monitor.bat   # Script for Windows
└── README.md
```

### 🤝 Contributing
Pull requests are welcome. Feel free to fork and customize!
