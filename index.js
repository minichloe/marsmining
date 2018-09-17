const Bot = require('./bot');
const { scan } = require('./requests');

const marsBot = new Bot();
const run = () => {
  marsBot.confirmRegistration();

  const nodes = scan();
};

run();
