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

const move = async (x, y) => {
  try {
    const { data } = await axios.post('/move', {
      callsign: process.env.CALLSIGN,
      x,
      y,
    });
    return new Promise(resolve => {
      resolve([data.Status.Location.X, data.Status.Location.Y]);
    });
  } catch (err) {
    console.error(err);
  }
};

const claim = async () => {
  try {
    const { data } = await axios.post('/claim', {
      callsign: process.env.CALLSIGN,
    });
    return new Promise(resolve => {
      resolve(data);
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { register, scan, move, claim };
