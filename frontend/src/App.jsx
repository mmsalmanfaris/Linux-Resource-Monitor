// src/App.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://localhost:8000/usage')
        .then(res => setData(res.data))
        .catch(err => console.error('Failed to fetch usage:', err))
    }

    fetchData()
    const interval = setInterval(fetchData, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-6 space-y-6">
      <h1 className="text-5xl font-bold text-center text-white">Linux Resource Monitor</h1>
      <div className='flex justify-center space-x-5'>

        {/* CPU Info */}
        <div className="bg-white rounded-lg p-4 shadow-md p-8">
          <h2 className="text-4xl font-semibold mb-2">CPU</h2>
          <p>Usage: {data.cpu_percent}%</p>
          <p>Cores: {data.cpu_count}</p>
          <p>Frequency: {data.cpu_freq[0].toFixed(2)} MHz</p>
        </div>

        {/* Memory Info */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2">Memory</h2>
          <p>Total: {formatBytes(data.v_memory[0])}</p>
          <p>Used: {formatBytes(data.v_memory[1])} ({data.v_memory[2]}%)</p>
          <p>Free: {formatBytes(data.v_memory[3])}</p>
        </div>

        {/* Swap Memory */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2">Swap</h2>
          <p>Total: {formatBytes(data.swap_memory[0])}</p>
          <p>Used: {formatBytes(data.swap_memory[1])} ({data.swap_memory[3]}%)</p>
          <p>Free: {formatBytes(data.swap_memory[2])}</p>
        </div>

        {/* Disk Usage */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2">Disk</h2>
          <p>Total: {formatBytes(data.disk_usage[0])}</p>
          <p>Used: {formatBytes(data.disk_usage[1])} ({data.disk_usage[3]}%)</p>
          <p>Free: {formatBytes(data.disk_usage[2])}</p>
        </div>

        {/* Battery */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2">Battery</h2>
          <p>Charge: {data.sensor_battery[0].toFixed(2)}%</p>
        </div>

        {/* Temperature */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold mb-2">Temperatures</h2>
          {Object.entries(data.sensor_temperatures).map(([key, sensors]) => (
            <div key={key} className="mb-2">
              <p className="font-semibold text-blue-300">{key}</p>
              {sensors.map((s, idx) => (
                <p key={idx}>{s[0] || 'Unknown'}: {s[1]}°C</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
