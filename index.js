const Bot = require('./bot');
const { scan, move, claim } = require('./requests');

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
    // Check to see what unclaimed nodes are in the area
    const nodes = await scan().filter(x => x.Claimed === false);
    // If there is nothing, move the bot to 5 steps beyond the 5x5 radius to scan again
    if (!nodes.length) {
      updateMap(marsBot.location, true);
      marsBot.toggleActive();
      const [x, y] = await goToEdge(marsBot.location);
      marsBot.toggleActive();
      marsBot.updateLocation(x, y);
      marsBot.printStatus();
    } else {
      // Claim nodes
      const { Status, Nodes } = await claim();
      console.log(Status, Nodes);
    }
  }
};

const moveToLocation = async location => {
  try {
    let [currX, currY] = marsBot.location;
    while (currX !== location[0] && currY !== location[1]) {
      currX = currX < location[0] ? currX + 1 : currX - 1;
      currY = currY < location[1] ? currY + 1 : currY - 1;
      [currX, currY] = await move(x.toString(), y.toString());
    }
    return [currX, currY];
  } catch (err) {
    console.error(err);
  }
};

const goToEdge = async location => {
  try {
    let [x, y] = location;
    const i = x + 10 > 100 ? x + 10 : x - 10;
    const j = y + 10 > 100 ? y + 10 : y - 10;
    while (x !== i && y !== j) {
      x = x < i ? x + 1 : x - 1;
      y = y < j ? y + 1 : y - 1;
      [x, y] = await move(x.toString(), y.toString());
    }
    return [x, y];
  } catch (err) {
    console.error(err);
  }
};

// Update visited map
const updateMap = (coordinates, radius = false) => {
  if (radius) {
    for (let i = coordinates[0] - 5; i <= coordinates[0] + 5; i++) {
      for (let j = coordinates[1] - 5; j <= coordinates[1] + 5; j++) {
        visited.set([i, j], true);
      }
    }
  } else {
    visited.set(coordinates, true);
  }
};

// setInterval(run, 1000);
run();
