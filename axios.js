const axios = require('axios');

// Configure which server to connect to
const axiosInstance = axios.create({
  baseURL: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
});

module.exports = axiosInstance;
