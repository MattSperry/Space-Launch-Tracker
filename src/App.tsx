import { useEffect, useState } from 'react'
import { Launch } from '../src/types/Launch'
import LaunchCard from './components/LaunchCard' // adjust path if different


export default function App() {
  const [launches, setLaunches] = useState<Launch[]>([])

  useEffect(() => {
    fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=12')
      .then(res => res.json())
      .then(data => setLaunches(data.results))
  }, [])

  return (
    <div className="min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">🚀 Space Launch Tracker</h1>
      <h3 className="text-3xl font-bold mb-6 text-center text-cyan-400">By: Matthew Sperry</h3>
      <br/>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {launches.map(launch => (
          <LaunchCard key={launch.id} launch={launch} />
        ))}
      </div>
    </div>
  )
}
