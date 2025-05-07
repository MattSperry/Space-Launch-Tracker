import { useState, useMemo, useEffect } from 'react';
import LaunchCard from './LaunchCard';
import { Launch } from '../types/Launch';

// Countdown Clock Component
const CountdownClock = ({ nextLaunch }: { nextLaunch: Launch | null }) => {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    if (!nextLaunch) return;

    const updateCountdown = () => {
      const now = new Date();
      const launchDate = new Date(nextLaunch.net);
      const diff = launchDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining('Launched!');
        return;
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextLaunch]);

  return (
    <div className="countdown bg-gray-800 rounded-lg p-4 mb-6 text-center text-xl font-semibold text-cyan-400">
      Next Launch: {timeRemaining}
    </div>
  );
};

// Launch List Component using existing LaunchCard
const LaunchList = ({ launches }: { launches: Launch[] }) => {
  const [filters, setFilters] = useState({ location: '', company: '', sort: 'date-asc' });

  const nextLaunch = useMemo(() =>
    launches.reduce((next: Launch | null, current: Launch) => {
      if (new Date(current.net) > new Date() && (!next || new Date(current.net) < new Date(next.net))) {
        return current;
      }
      return next;
    }, null),
  [launches]);

  const filteredLaunches = useMemo(() => {
    let result = [...launches];
    if (filters.location) result = result.filter(l => l.pad.location.name === filters.location);
    if (filters.company) result = result.filter(l => l.launch_service_provider.name === filters.company);
    result.sort((a, b) => {
      const dateA = new Date(a.net).getTime();
      const dateB = new Date(b.net).getTime();
      return filters.sort === 'date-asc' ? dateA - dateB : dateB - dateA;
    });
    return result;
  }, [launches, filters]);

  return (
    <div className="w-full">
      <CountdownClock nextLaunch={nextLaunch} />
      <div className="filters flex flex-col sm:flex-row gap-4 mb-8 justify-center">
        <select
          onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}
          className="bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="date-asc">Date ↑</option>
          <option value="date-desc">Date ↓</option>
        </select>
        <select
          onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
          className="bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="">All Locations</option>
          {Array.from(new Set(launches.map(l => l.pad.location.name))).map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <select
          onChange={e => setFilters(f => ({ ...f, company: e.target.value }))}
          className="bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="">All Companies</option>
          {Array.from(new Set(launches.map(l => l.launch_service_provider.name))).map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="launch-list w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredLaunches.map(launch => (
          <LaunchCard key={launch.id} launch={launch} />
        ))}
      </div>
    </div>
  );
};

export default LaunchList;