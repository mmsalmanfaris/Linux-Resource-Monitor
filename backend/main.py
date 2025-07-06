from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return{"message":" Hello Monitoring System"}

@app.get("/usage")
async def usage():
    return {
        "cpu_percent": psutil.cpu_percent(interval=None),
        "cpu_count": psutil.cpu_count(),
        "cpu_freq": psutil.cpu_freq(),
        "v_memory": psutil.virtual_memory(),
        "swap_memory": psutil.swap_memory(),
        "disk_usage": psutil.disk_usage('/'),
        "net_io": psutil.net_io_counters(),
        "net_connection": psutil.net_connections(),
        "net_stats": psutil.net_if_stats(),
        "sensor_temperatures": psutil.sensors_temperatures(),
        "sensor_fans": psutil.sensors_fans(),
        "sensor_battery": psutil.sensors_battery(),
        "boot_time": psutil.boot_time(),
        "user": psutil.users()
    }
