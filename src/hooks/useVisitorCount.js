import { useState, useEffect } from 'react';
import { useCache } from '../context/CacheContext';
import config from '../config';

const useVisitorCount = () => {
  const [count, setCount] = useState(0);
  const { getCache, setCache } = useCache();
  const CACHE_KEY = 'visitor-count';

  useEffect(() => {
    const cached = getCache(CACHE_KEY);
    if (cached) {
      setCount(cached);
      return;
    }

    fetch(`${config.BASE_URL}/api/users/visitor-count`)
      .then(res => res.json())
      .then(data => {
        setCache(CACHE_KEY, data.count);
        setCount(data.count);
      })
      .catch(error => console.error('Error fetching visitor count:', error));
  }, []);

  return count;
};

export default useVisitorCount;
