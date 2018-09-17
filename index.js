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
    // If there is nothing, move the bot to 5 steps beyond the 5x5 radius to scan again
    if (!nodes.length) {
      updateMap(marsBot.location, true);
      marsBot.toggleActive();
      const [x, y] = await goToEdge(marsBot.location);
      marsBot.toggleActive();
      marsBot.updateLocation(x, y);
      marsBot.printStatus();
    } else {
      console.log('Finding best node...');
      const node = findBestNode(nodes);
      if (node) {
        console.log('Moving to chosen node...');
        await moveToLocation([node.Location.X, node.Location.Y]);
      }
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

// Find unclaimed node with highest value
const findBestNode = nodes => {
  nodes = nodes.filter(x => x.Claimed === false);
  if (!nodes.length) return null;
  else if (nodes.length === 1) return nodes[0];
  else {
    let highestIndex = 0,
      highestValue = nodes[0].Value;
    nodes.forEach((x, i) => {
      if (x.Value > highestValue) {
        highestValue = x.Value;
        highestIndex = i;
      }
    });
    return nodes[highestIndex];
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
