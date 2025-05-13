import { useState, useMemo, useEffect } from 'react';
import LaunchCard from './LaunchCard';
import { Launch } from '../types/Launch';

// Countdown Clock Component
const CountdownClock = ({ nextLaunch }: { nextLaunch: Launch | null }) => {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    if (!nextLaunch) {
      setTimeRemaining('No upcoming launches with current filter.');
      return;
    }

    const updateCountdown = () => {
      const now = new Date();
      const launchDate = new Date(nextLaunch.net);
      const diff = launchDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining('Launched!');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown(); // Initial call to set time immediately
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextLaunch]);

  return (
    <div className="countdown bg-gray-800 bg-opacity-75 rounded-lg p-4 mb-6 text-center text-xl font-semibold text-cyan-400 min-h-[60px] flex items-center justify-center">
      Next Launch: {timeRemaining}
    </div>
  );
};

// Launch List Component using existing LaunchCard
const LaunchList = ({ launches }: { launches: Launch[] }) => {
  const [filters, setFilters] = useState({ location: '', company: '', sort: 'date-asc' });

  const filteredLaunches = useMemo(() => {
    let result = [...launches];
    if (filters.location) result = result.filter(l => l.pad.location.name === filters.location);
    if (filters.company) result = result.filter(l => l.launch_service_provider.name === filters.company);
    
    // Filter out past launches before sorting and finding the next one for the countdown
    result = result.filter(l => new Date(l.net) > new Date());

    result.sort((a, b) => {
      const dateA = new Date(a.net).getTime();
      const dateB = new Date(b.net).getTime();
      return filters.sort === 'date-asc' ? dateA - dateB : dateB - dateA;
    });
    return result;
  }, [launches, filters]);

  const nextFilteredLaunch = useMemo(() => {
    // The first launch in the sorted filteredLaunches list is the next one
    return filteredLaunches.length > 0 ? filteredLaunches[0] : null;
  }, [filteredLaunches]);

  // Unique locations and companies for filter dropdowns
  const uniqueLocations = useMemo(() => Array.from(new Set(launches.map(l => l.pad.location.name))).sort(), [launches]);
  const uniqueCompanies = useMemo(() => Array.from(new Set(launches.map(l => l.launch_service_provider.name))).sort(), [launches]);

  return (
    <div className="w-full flex flex-col items-center">
      <CountdownClock nextLaunch={nextFilteredLaunch} />
      <div className="filters flex flex-col sm:flex-row gap-4 mb-8 justify-center w-full max-w-3xl">
        <select
          value={filters.sort}
          onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}
          className="bg-gray-700 bg-opacity-75 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 flex-grow sm:flex-grow-0"
        >
          <option value="date-asc">Sort: Date ↑ (Soonest)</option>
          <option value="date-desc">Sort: Date ↓ (Latest)</option>
        </select>
        <select
          value={filters.location}
          onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
          className="bg-gray-700 bg-opacity-75 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 flex-grow sm:flex-grow-0"
        >
          <option value="">Filter: All Locations</option>
          {uniqueLocations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <select
          value={filters.company}
          onChange={e => setFilters(f => ({ ...f, company: e.target.value }))}
          className="bg-gray-700 bg-opacity-75 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 flex-grow sm:flex-grow-0"
        >
          <option value="">Filter: All Companies</option>
          {uniqueCompanies.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      {/* Ensure the launch list container itself doesn't cause reflow affecting elements above it */}
      {/* The grid will adjust, but its container should be stable */}
      <div className="launch-list w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {filteredLaunches.length > 0 ? (
          filteredLaunches.map(launch => (
            <LaunchCard key={launch.id} launch={launch} />
          ))
        ) : (
          <p className="text-center text-xl col-span-full py-10">No launches match the current filters.</p>
        )}
      </div>
    </div>
  );
};

export default LaunchList;

