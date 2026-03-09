import React, { createContext, useContext, useRef } from 'react';

const CacheContext = createContext();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const CacheProvider = ({ children }) => {
  const cacheRef = useRef({});

  const getCache = (key) => {
    const cached = cacheRef.current[key];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  };

  const setCache = (key, data) => {
    cacheRef.current[key] = { data, timestamp: Date.now() };
  };

  const invalidateCache = (key) => {
    if (key) {
      delete cacheRef.current[key];
    } else {
      cacheRef.current = {};
    }
  };

  return (
    <CacheContext.Provider value={{ getCache, setCache, invalidateCache }}>
      {children}
    </CacheContext.Provider>
  );
};

export const useCache = () => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache must be used within CacheProvider');
  }
  return context;
};
