const config = {
  BASE_URL: process.env.NODE_ENV === 'production'
    ? 'https://tri-cod-be.vercel.app/api'
    : 'http://localhost:5000'
};

export default config;
