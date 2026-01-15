const config = {
  LOCAL_BASE_URL: 'http://localhost:5000',
  BASE_URL: 'https://your-production-url.com',
  API_BASE_URL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000/api' 
    : 'https://your-production-url.com/api'
};

export default config;
