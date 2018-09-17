const axios = require('./axios');

const register = async bot => {
  try {
    const { data } = await axios.post('/register', {
      callsign: process.env.CALLSIGN,
    });
    bot.initialize(data.Status);
  } catch (err) {
    console.error(err);
  }
};

module.exports = register;
