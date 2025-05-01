import { useEffect, useState } from 'react'

type Launch = {
  id: string
  name: string
  net: string
  image: string | null
  pad: {
    name: string
    location: { name: string }
  }
  mission: {
    type: string
    description: string
  }
}

function LaunchCard({ launch }: { launch: Launch }) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
      {launch.image && <img src={launch.image} alt={launch.name} className="w-full h-32 object-cover" />}
      <div className="p-4">
        <h2 className="text-xl font-semibold">{launch.name}</h2>
        <p className="text-sm text-gray-400">{launch.net}</p>
        <p className="text-sm text-gray-500">{launch.pad.name}, {launch.pad.location.name}</p>
        <p className="text-sm text-gray-500">{launch.mission.type}</p>
        <p className="text-sm text-gray-500">{launch.mission.description}</p>
      </div>
    </div>
  )
}

export default function App() {
  const [launches, setLaunches] = useState<Launch[]>([])

  useEffect(() => {
    fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=12')
      .then(res => res.json())
      .then(data => setLaunches(data.results))
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
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
