import { useState, useEffect } from 'react';
import { useCache } from '../context/CacheContext';
import config from '../config';

const useRegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getCache, setCache, invalidateCache } = useCache();
  const CACHE_KEY = 'registered-events';

  useEffect(() => {
    const fetchEvents = async () => {
      const cached = getCache(CACHE_KEY);
      if (cached) {
        setEvents(cached);
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${config.BASE_URL}/api/users/registered-events`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        const eventsList = data.events || [];
        
        setCache(CACHE_KEY, eventsList);
        setEvents(eventsList);
      } catch (error) {
        console.error('Error fetching registered events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, invalidateCache: () => invalidateCache(CACHE_KEY) };
};

export default useRegisteredEvents;
