const Bot = require('./bot');
const { scan } = require('./requests');

const marsBot = new Bot();
const visited = new Map();

const run = () => {
  // Initialize the bot by registering it and updating its parameters
  // Keep track of all places visited
  marsBot.confirmRegistration();
  visited.set(marsBot.location, true);
  console.log(visited);

  // Check to see if there are any active requests to avoid duplicate requests
  if (marsBot.active) {
    setTimeout(() => run(), 100);
    return;
  } else {
    // Check to see what nodes are in the area
    const nodes = scan();

    // If there is nothing, move the bot to 5 steps beyond the 5x5 radius to scan again
    if (!nodes.length) {
    }
  }
};

const goToEdge = (x, y) => {
  x = x + 10;
  y = y + 10;
};

run();
