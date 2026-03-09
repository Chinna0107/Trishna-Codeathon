// src/App.jsx

import Hero from './components/sections/Hero';
import Router from './router';
import { CacheProvider } from './context/CacheContext';

// Import other sections as you create them

const App = () => {
  return (
    <CacheProvider>
      <Router />
    </CacheProvider>
  );
};

export default App;