const faker = require('faker');

// ---------------------------------
// Generate attributes
// ---------------------------------

class Community {
  constructor(name, latitude, longitude) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

const communities = [
  new Community('Wusuta Sakakyere', 6.822487, 0.246398),
  new Community('Kpando', 6.862349, -0.282640),
  new Community('Adawso', 6.517805, -0.270774),
  new Community('Gonja', 8.215568, -0.436964),
  new Community('Katua', 9.945856, -1.953077),
];

function getCommunity(name) {
  return communities.find(community => community.name === name);
}

function getRandomCommunityName() {
  return faker.random.arrayElement(communities).name;
}

function generateMessageId() {
  return faker.random.uuid();
}


// ---------------------------------
// Generate data
// ---------------------------------

function generateTimestamp(hourOfDay) {
  const millisecondTimestamp = Date.now();
  const unixTimestamp = Math.floor(millisecondTimestamp / 1000);
  return unixTimestamp + (hourOfDay * 3600);
}

Math.normalizedRandom = () => {
  let x1;
  let x2;
  let rad;
  do {
    x1 = (2 * Math.random()) - 1;
    x2 = (2 * Math.random()) - 1;
    rad = (x1 * x1) + (x2 * x2);
  } while (rad >= 1 || rad === 0);
  const c = Math.sqrt((-2 * Math.log(rad)) / rad);
  return x1 * c;
};

// value from 35 - 45, with two decimals
function generateFunctioningValue() {
  // constants
  const BASE_VALUE = 35.0;
  const VARIANCE_AMOUNT = 7;
  const NUMBER_DECIMAL_PLACES = 1e2;
  // normally distributed value
  const randomValue = (Math.normalizedRandom() * VARIANCE_AMOUNT) + BASE_VALUE;
  // round and absolute value
  const roundedValue = Math.round(randomValue * NUMBER_DECIMAL_PLACES) / NUMBER_DECIMAL_PLACES;
  return Math.abs(roundedValue);
}

// sigmoid function, starting at 35 then decaying to 0-2
function generateBrokenValue(index) {
  // constants
  const STARTING_BASE_VALUE = 35;
  const BEGIN_DECAY_INDEX = 10;
  const DECAY_RATE = 2.5;
  const NUMBER_DECIMAL_PLACES = 1e2;
  // sigmoid formula
  const sigmoidDecayValue = STARTING_BASE_VALUE /
    (1 + (Math.E ** ((DECAY_RATE * index) - BEGIN_DECAY_INDEX)));
  // add noise
  let sigmoidDecayValueWithNoise;
  if (sigmoidDecayValue > 20) {
    const VARIANCE_AMOUNT = 5;
    sigmoidDecayValueWithNoise = sigmoidDecayValue + (Math.normalizedRandom() * VARIANCE_AMOUNT);
  } else {
    const VARIANCE_AMOUNT = 2;
    sigmoidDecayValueWithNoise = sigmoidDecayValue + (Math.random() * VARIANCE_AMOUNT);
  }
  // round and absolute value
  const roundedValue = Math.round(sigmoidDecayValueWithNoise * NUMBER_DECIMAL_PLACES)
    / NUMBER_DECIMAL_PLACES;
  return Math.abs(roundedValue);
}

function generateDatapoints(numDatapoints, isBroken = false) {
  const datapoints = [];
  for (let i = 0; i < numDatapoints; i += 1) {
    const timestamp = generateTimestamp(i);
    const value = isBroken ? generateBrokenValue(i) : generateFunctioningValue();
    datapoints.push([timestamp, value]);
  }
  return datapoints;
}

// ---------------------------------
// Generate JSON record
// ---------------------------------

function generateJson(communityName, datapoints) {
  const community = getCommunity(communityName);
  const message = {
    messageId: generateMessageId(),
    body: [{
      name: 'hourly_water_flow',
      datapoints,
      attributes: {
        community: community.name,
        latitude: community.latitude,
        longitude: community.longitude,
      },
    }],
  };
  return JSON.stringify(message);
}

module.exports = {
  generateFunctioningData(name) {
    return generateJson(name, generateDatapoints(24));
  },
  generateBrokenData(name) {
    return generateJson(name, generateDatapoints(24, true)); // true means well is broken
  },
  getRandomCommunityName() {
    return getRandomCommunityName();
  },
};
