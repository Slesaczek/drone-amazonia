export const calculateShortestPath = (apiData, start, end) => {
  const distances = {};
  const previousNodes = {};

  for (const node of Object.keys(apiData)) {
    distances[node] = Number.POSITIVE_INFINITY;
    previousNodes[node] = null;
  }

  distances[start] = 0;

  const visitedNodes = [];

  let currentNode = start;

  while (currentNode !== end) {
    visitedNodes.push(currentNode);

    const neighbors = apiData[currentNode];

    for (const neighborKey of Object.keys(neighbors)) {
      const neighborValue = neighbors[neighborKey];

      if (!visitedNodes.includes(neighborKey)) {
        const tentativeDistance = distances[currentNode] + neighborValue;

        if (tentativeDistance < distances[neighborKey]) {
          distances[neighborKey] = tentativeDistance;
          previousNodes[neighborKey] = currentNode;
        }
      }
    }

    const unvisitedDistances = Object.entries(distances)
      .filter(([node]) => !visitedNodes.includes(node))
      .sort((a, b) => a[1] - b[1]);

    currentNode = unvisitedDistances[0] ? unvisitedDistances[0][0] : null;

    if (currentNode === null) {
      break;
    }
  }

  if (previousNodes[end] === null) {
    return { path: "No valid path found", time: -1 };
  }

  const path = [];
  let current = end;
  while (current !== null) {
    path.unshift(current);
    current = previousNodes[current];
  }

  const fullPath = path.join(" -> ");
  const totalTime = distances[end];

  return { path: fullPath, time: totalTime };
};

export const calculatePaths = (apiData, coordinates) => {
  const start = coordinates.DroneStart;
  const pickup = coordinates.ObjectPickup;
  const destination = coordinates.DeliveryDestination;

  console.log("Start:", start);
  console.log("Pickup:", pickup);
  console.log("Destination:", destination);

  const { path: pathToPickup, time: timeToPickup } = calculateShortestPath(
    apiData,
    start,
    pickup
  );

  console.log("Path to Pickup:", pathToPickup);
  console.log("Time to Pickup:", timeToPickup);

  const { path: pathToDestination, time: timeToDestination } =
    calculateShortestPath(apiData, pickup, destination);

  console.log("Path to Destination:", pathToDestination);
  console.log("Time to Destination:", timeToDestination);

  if (
    pathToPickup === "No valid path found" ||
    pathToDestination === "No valid path found"
  ) {
    return ["No valid path found", -1];
  }

  const fullPath = `${pathToPickup} -> ${pathToDestination}`;
  const totalTime = timeToPickup + timeToDestination;

  return [fullPath, totalTime];
};

export default { calculatePaths, calculateShortestPath };
