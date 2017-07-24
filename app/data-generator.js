// ---------------------------------
// Generate individual attributes
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
  return communities[Math.floor(Math.random() * communities.length)].name;
}

function generateMessageId() {
  return `_${Math.random().toString(36).substr(2, 9)}`;
}

function generateTimestamp(hourOfDay) {
  const millisecondTimestamp = Date.now();
  const unixTimestamp = Math.floor(millisecondTimestamp / 1000);
  return unixTimestamp + (hourOfDay * 3600);
}

function generateFunctioningValue() {
  const randomValue = (Math.random() * 10) + 35.0;
  return Math.round(randomValue * 1e2) / 1e2;
}

function generateBrokenValue() {
  const randomValue = (Math.random() * 2);
  return Math.round(randomValue * 1e2) / 1e2;
}

// TODO: Is there a better way to generate both broken & functioning data?
function generateDatapoints(numDatapoints, isNotBroken) {
  const datapoints = [];
  for (let i = 0; i < numDatapoints; i += 1) {
    const timestamp = generateTimestamp(i);
    const value = isNotBroken ? generateFunctioningValue() : generateBrokenValue();
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
    return generateJson(name, generateDatapoints(4, true));
  },
  generateBrokenData(name) {
    return generateJson(name, generateDatapoints(4, false));
  },
  getRandomCommunityName() {
    return getRandomCommunityName();
  },
};
