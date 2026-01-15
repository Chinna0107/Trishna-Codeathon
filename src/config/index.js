const config = {
  BASE_URL: process.env.REACT_APP_BASE_URL || 'https://tri-cod-be.vercel.app',
  LOCAL_BASE_URL: process.env.REACT_APP_LOCAL_BASE_URL || 'http://localhost:5000',
  API_BASE_URL: process.env.REACT_APP_BASE_URL ? `${process.env.REACT_APP_BASE_URL}/api` : 'https://tri-cod-be.vercel.app/api'
};

export default config;
