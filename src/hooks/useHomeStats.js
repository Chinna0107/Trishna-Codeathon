import { useState, useEffect } from 'react';
import { useCache } from '../context/CacheContext';
import config from '../config';

const useHomeStats = () => {
  const [stats, setStats] = useState({ totalEvents: 0, myRegistrations: 0 });
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getCache, setCache } = useCache();
  const CACHE_KEY = 'home-stats';

  useEffect(() => {
    const fetchStats = async () => {
      const cached = getCache(CACHE_KEY);
      if (cached) {
        setStats(cached.stats);
        setRegisteredEvents(cached.events);
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        
        const [eventsRes, regsRes] = await Promise.all([
          fetch(`${config.BASE_URL}/api/events`),
          fetch(`${config.BASE_URL}/api/participants/registrations?email=${userData.email}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        
        const events = await eventsRes.json();
        const regs = await regsRes.json();
        const eventsData = regs.registrations || regs || [];
        
        const newStats = {
          totalEvents: 6,
          myRegistrations: eventsData.length || 0
        };
        
        setCache(CACHE_KEY, { stats: newStats, events: eventsData.slice(0, 4) });
        setStats(newStats);
        setRegisteredEvents(eventsData.slice(0, 4));
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, registeredEvents, loading };
};

export default useHomeStats;
