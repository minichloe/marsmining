const Bot = require('./bot');
const { scan, move } = require('./requests');

const marsBot = new Bot();
const visited = new Map();

const run = async () => {
  // Initialize the bot by registering it and updating its parameters
  // Keep track of all places visited
  await marsBot.confirmRegistration();
  visited.set(marsBot.location, true);

  // Check to see if there are any active requests to avoid duplicate requests
  if (marsBot.active) {
    return;
  } else {
    // Check to see what nodes are in the area
    const nodes = await scan();
    console.log(nodes);
    // If there is nothing, move the bot to 5 steps beyond the 5x5 radius to scan again
    // if (!nodes.length) {
    //   let [x, y] = marsBot.location;
    //   marsBot.toggleActive();
    //   [x, y] = await move(x.toString(), y.toString());
    //   marsBot.toggleActive();
    //   marsBot.updateLocation(x, y);
    //   marsBot.printStatus();
    // }
  }
};

// Delay each request by 100ms
const delay = func => (...args) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(func(...args));
    }, 100);
  });

const goToEdge = async location => {
  let [x, y] = location;
  const i = x + 10 > 100 ? x + 10 : x - 10;
  const j = y + 10 > 100 ? y + 10 : y - 10;
  const delayedMove = delay(move.bind(move));
  while (x !== i && y !== j) {
    x = x < i ? x++ : x--;
    y = y < j ? y++ : y--;
    [x, y] = await delayedMove(x.toString(), y.toString());
  }
  return [x, y];
};

run();
