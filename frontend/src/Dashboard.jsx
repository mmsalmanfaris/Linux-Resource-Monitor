import {
    Cpu,
    MemoryStick,
    HardDrive,
    Shuffle,
    BatteryCharging,
    Thermometer,
    Plug2,
    Battery,
    ServerCog
} from "lucide-react"
import { PieChart, Pie, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts"

const COLORS = ["#38bdf8", "#6366f1", "#10b981", "#facc15"]

const formatBytes = (bytes) => {
    const sizes = ["B", "KB", "MB", "GB", "TB"]
    if (bytes === 0) return "0 B"
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}

function ResourceCard({ icon: Icon, title, children, chartData }) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-5 w-full sm:w-1/2 lg:w-1/5 space-y-4 flex flex-col justify-between">
            <div className="flex items-center gap-3">
                <Icon className="text-blue-500" />
                <h2 className="text-xl font-semibold">{title}</h2>
            </div>
            <div className="text-sm space-y-1">{children}</div>
            {chartData && (
                <ResponsiveContainer width="100%" height={120}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            outerRadius={50}
                            innerRadius={30}
                            paddingAngle={5}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}

const TEMP_COLORS = [
    "oklch(0.768 0.233 130.85)",
    "oklch(0.723 0.219 149.579)",
    "oklch(0.696 0.17 162.48)",
    "oklch(0.704 0.14 182.503)",
    "oklch(0.715 0.143 215.221)",
    "oklch(0.685 0.169 237.323)",
    "oklch(0.623 0.214 259.815)",
    "oklch(0.585 0.233 277.117)"
]

function TemperatureChartCard({ sensor_temperatures }) {
    const chartData = []

    Object.entries(sensor_temperatures).forEach(([group, sensors]) => {
        sensors.forEach((sensor, index) => {
            chartData.push({
                name: `${group} ${sensor[0] || index}`,
                temperature: sensor[1],
            })
        })
    })

    return (
        <div className="bg-white rounded-2xl shadow-md p-5 w-full sm:w-full lg:w-[42%]">
            <div className="flex items-center gap-3 mb-3">
                <Thermometer className="text-red-500" />
                <h2 className="text-xl font-semibold">Temperatures</h2>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
                    <XAxis type="number" domain={[0, 'dataMax + 10']} unit="°C" />
                    <YAxis type="category" dataKey="name" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="temperature" radius={[0, 4, 4, 0]}>
                        {chartData.map((entry, index) => (
                            <Cell key={index} fill={TEMP_COLORS[index % TEMP_COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}


function Dashboard({ data }) {
    const cpuChart = [
        { name: "Used", value: data.cpu_percent },
        { name: "Free", value: 100 - data.cpu_percent },
    ]

    const memoryChart = [
        { name: "Used", value: data.v_memory[2] },
        { name: "Free", value: 100 - data.v_memory[2] },
    ]

    const swapChart = [
        { name: "Used", value: data.swap_memory[3] },
        { name: "Free", value: 100 - data.swap_memory[3] },
    ]

    const diskChart = [
        { name: "Used", value: data.disk_usage[3] },
        { name: "Free", value: 100 - data.disk_usage[3] },
    ]

    const batteryLevel = parseFloat(data.sensor_battery[0].toFixed(2))

    const batteryChart = [
        { name: "Battery", value: batteryLevel },
    ]



    return (
        <div className=" bg-gray-100  min-h-screen">
            <div className="bg-black flex justify-between items-center px-6 py-3 flex-wrap gap-3">
                <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Time: {new Date().toLocaleTimeString()}
                </span>

                <h1 className="text-white text-3xl font-bold text-center ps-25">
                    Linux Resource Monitor
                </h1>

                <span className="bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Boot Time: {new Date(data.boot_time * 1000).toLocaleString()}
                </span>
            </div>


            <div className="p-6 flex justify-center flex-wrap gap-6">
                <ResourceCard icon={Cpu} title="CPU" chartData={cpuChart}>
                    <p>Usage: {data.cpu_percent}%</p>
                    <p>Cores: {data.cpu_count}</p>
                    <p>Freq: {data.cpu_freq[0].toFixed(0)} MHz</p>
                </ResourceCard>

                <ResourceCard icon={MemoryStick} title="Memory" chartData={memoryChart}>
                    <p>Total: {formatBytes(data.v_memory[0])}</p>
                    <p>
                        Used: {formatBytes(data.v_memory[1])} ({data.v_memory[2]}%)
                    </p>
                    <p>Free: {formatBytes(data.v_memory[3])}</p>
                </ResourceCard>

                <ResourceCard icon={Shuffle} title="Swap" chartData={swapChart}>
                    <p>Total: {formatBytes(data.swap_memory[0])}</p>
                    <p>
                        Used: {formatBytes(data.swap_memory[1])} ({data.swap_memory[3]}%)
                    </p>
                    <p>Free: {formatBytes(data.swap_memory[2])}</p>
                </ResourceCard>

                <ResourceCard icon={HardDrive} title="Disk" chartData={diskChart}>
                    <p>Total: {formatBytes(data.disk_usage[0])}</p>
                    <p>
                        Used: {formatBytes(data.disk_usage[1])} ({data.disk_usage[3]}%)
                    </p>
                    <p>Free: {formatBytes(data.disk_usage[2])}</p>
                </ResourceCard>

                {/* Battery Card */}
                <ResourceCard icon={BatteryCharging} title="Battery">
                    <p>Charge: {batteryLevel}%</p>
                    <p className="flex items-center gap-2">
                        Status: {data.sensor_battery[1] === -1 ? (
                            <>
                                Charging <Plug2 className="inline w-5 h-5 text-green-500" />
                            </>
                        ) : (
                            <>
                                Battery <Battery className="inline w-5 h-5 text-yellow-500" />
                            </>
                        )}
                    </p>

                    {/* Battery Chart */}
                    <div className="flex justify-center">
                        <ResponsiveContainer width={260} height={250}>
                            <BarChart data={batteryChart}>
                                <XAxis dataKey="name" hide />
                                <YAxis domain={[0, 100]} hide />
                                <Tooltip formatter={(v) => `${v}%`} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    <Cell
                                        fill={
                                            batteryLevel > 80
                                                ? "#10b981"
                                                : batteryLevel > 20
                                                    ? "#facc15"
                                                    : "#ef4444"
                                        }
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ResourceCard>



                <TemperatureChartCard sensor_temperatures={data.sensor_temperatures} />

                <ResourceCard icon={ServerCog} title="Top Processes">
                    <div className="overflow-y-auto pr-2 text-sm text-gray-700">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b">
                                    {/* <th className="pr-4">PID</th> */}
                                    <th className="pr-4">Name</th>
                                    <th>User</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(data.running_process)
                                    .slice(0, 8)
                                    .map(([pid, proc]) => (
                                        <tr key={pid} className="border-b">
                                            {/* <td className="py-1 pr-4 text-blue-600 font-mono">{pid}</td> */}
                                            <td className="py-1 pr-4">{proc.name}</td>
                                            <td className="py-1 text-gray-500">{proc.username}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </ResourceCard>
            </div>

            <footer className="text-center py-4 text-sm bg-black text-white mt-8">
                Open Source - <a href="https://github.com/mmsalmanfaris" target="_blank" rel="noopener noreferrer" className="hover:underline">mmsalmanfaris</a>
            </footer>

        </div>
    )
}

export default Dashboard
