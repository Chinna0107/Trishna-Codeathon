import { useState, useEffect } from 'react';
import { useCache } from '../context/CacheContext';
import config from '../config';

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getCache, setCache } = useCache();
  const CACHE_KEY = 'user-profile';

  useEffect(() => {
    const fetchProfile = async () => {
      const cached = getCache(CACHE_KEY);
      if (cached) {
        setProfile(cached);
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (!token || !user) {
          setProfile(JSON.parse(user || '{}'));
          setLoading(false);
          return;
        }

        const response = await fetch(`${config.BASE_URL}/api/users/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setCache(CACHE_KEY, data);
          setProfile(data);
        } else {
          const userData = JSON.parse(user);
          setCache(CACHE_KEY, userData);
          setProfile(userData);
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
        const user = localStorage.getItem('user');
        if (user) {
          const userData = JSON.parse(user);
          setCache(CACHE_KEY, userData);
          setProfile(userData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading };
};

export default useProfile;
