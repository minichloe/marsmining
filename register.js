const axios = require('./axios');

const register = async () => {
  try {
    const callsign = {
      callsign: 'SierraEcho',
    };
    const { data } = await axios.post('/register', callsign);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

module.exports = register;
