// src/App.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import Dashboard from './Dashboard'

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
      axios.get('http://192.168.8.128:8000/usage')
        .then(res => setData(res.data))
        .catch(err => console.error('Failed to fetch usage:', err))
    }

    fetchData()
    const interval = setInterval(fetchData, 2000)
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
    <Dashboard data={data} />
  )
}

export default App
