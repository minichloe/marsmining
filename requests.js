// Configure which server to connect to
const axios = require('axios').create({
  baseURL: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
});

const register = async () => {
  try {
    const { data } = await axios.post('/register', {
      callsign: process.env.CALLSIGN,
    });
    return new Promise(resolve => {
      resolve(data.Status);
    });
  } catch (err) {
    console.error(err);
  }
};

const scan = async () => {
  try {
    const { data } = await axios.post('/scan', {
      callsign: process.env.CALLSIGN,
    });
    return new Promise(resolve => {
      resolve(data.Nodes);
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { register, scan };
