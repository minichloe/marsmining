const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
});

module.exports = axiosInstance;
