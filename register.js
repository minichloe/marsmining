const axios = require('./axios');

const register = async () => {
  try {
    const { data } = await axios.post('/register', {
      callsign: process.env.CALLSIGN,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

module.exports = register;
