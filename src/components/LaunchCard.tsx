import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Launch } from '../types/Launch'

function LaunchCard({ launch }: { launch: Launch }) {
  const [showDescription, setShowDescription] = useState(false)

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-shadow hover:shadow-2xl">
      {launch.image && (
        <img
          src={launch.image}
          alt={launch.name}
          className="w-full h-32 object-cover"
        />
      )}

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">{launch.name}</h2>
        <p className="text-sm text-gray-400">{launch.net}</p>
        <p className="text-sm text-gray-500">
          {launch.launch_service_provider.name}, {launch.pad.name}, {launch.pad.location.name}
        </p>
        <p className="text-sm text-gray-500 font-medium">
          {launch.mission?.type}
        </p>

        {/* Only show the toggle button if there's a description */}
        {launch.mission?.description && (
          <>
            <button
              onClick={() => setShowDescription(prev => !prev)}
              className="flex items-center text-sm text-cyan-400 hover:text-white transition"
            >
              {showDescription ? (
                <ChevronUp size={18} className="mr-1" />
              ) : (
                <ChevronDown size={18} className="mr-1" />
              )}
              {showDescription ? 'Hide Details' : 'Show Details'}
            </button>

            {showDescription && (
              <p className="text-sm text-gray-300 mt-2">
                {launch.mission.description}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default LaunchCard
