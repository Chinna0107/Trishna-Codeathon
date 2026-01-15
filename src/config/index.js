const config = {
  LOCAL_BASE_URL: 'http://localhost:5000',
  BASE_URL: 'https://tri-cod-be.vercel.app',
  API_BASE_URL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000/api' 
    : 'https://tri-cod-be.vercel.app/api'
};

export default config;
