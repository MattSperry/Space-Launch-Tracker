import { useEffect, useState } from 'react';
import { Launch } from '../src/types/Launch';
import LaunchList from './components/LaunchList';

export default function App() {
  const [launches, setLaunches] = useState<Launch[]>([]);

  useEffect(() => {
    fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=12')
      .then(res => res.json())
      .then(data => setLaunches(data.results));
  }, []);

  return (
    <div className="min-h-screen text-white p-6 bg-[url('/stars-dark.jpg')] bg-cover bg-fixed">
      <h1 className="text-3xl font-bold mb-4 text-center text-cyan-400">🚀 Space Launch Tracker</h1>
      <h3 className="text-xl font-semibold mb-8 text-center text-cyan-400">By: Matthew Sperry</h3>
      <LaunchList launches={launches} />
    </div>
  );
}