from fastapi import FastAPI
import psutil

app = FastAPI()


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
        "memory_usage": "30%",
        "disk_usage": "40%"
    }