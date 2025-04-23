type Launch = {
    name: string;
    net: string;
    image: string | null;
    pad: {
      name: string;
      location: { name: string };
    };
  };
  
  export function LaunchCard({ launch }: { launch: Launch }) {
    return (
      <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-md">
        {launch.image && <img src={launch.image} alt={launch.name} className="w-full h-48 object-cover" />}
        <div className="p-4">
          <h2 className="text-xl font-semibold">{launch.name}</h2>
          <p className="text-sm text-gray-400">{launch.net}</p>
          <p className="text-sm text-gray-400">{launch.pad.name}, {launch.pad.location.name}</p>
        </div>
      </div>
    );
  }
  