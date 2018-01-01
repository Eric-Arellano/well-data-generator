const faker = require('faker')

// ---------------------------------
// Generate attributes
// ---------------------------------

class Community {
  constructor (name, latitude, longitude) {
    this.name = name
    this.latitude = latitude
    this.longitude = longitude
  }
}

const communities = [
  new Community('Wusuta Sakakyere', 6.822487, 0.246398),
  new Community('Kpando', 6.862349, -0.282640),
  new Community('Adawso', 6.517805, -0.270774),
  new Community('Gonja', 8.215568, -0.436964),
  new Community('Katua', 9.945856, -1.953077),
]

function getRandomCommunityName () {
  return faker.random.arrayElement(communities).name
}

function generateMessageId () {
  return faker.random.uuid()
}

// ---------------------------------
// Value types
// ---------------------------------
class ValueType {
  constructor (baseValue, variance, beginDecayIndex, decayRate, numberDecimals) {
    this.baseValue = baseValue
    this.variance = variance
    this.beginDecayIndex = beginDecayIndex
    this.decayRate = decayRate
    this.numberDecimals = numberDecimals
  }
}

const flowType = new ValueType(35.0, 7.0, 10, 2.5, 1e1)
const salinityType = new ValueType(18.0, 3.4, 5, 1.1, 1e2)
const turbidityType = new ValueType(0.97, 0.4, 3, 0.2, 1e4)

// ---------------------------------
// Generate data
// ---------------------------------

function generateTimestamp (hourOfDay) {
  const millisecondTimestamp = Date.now()
  const unixTimestamp = Math.floor(millisecondTimestamp / 1000)
  return unixTimestamp + (hourOfDay * 3600)
}

Math.normalizedRandom = () => {
  let x1
  let x2
  let rad
  do {
    x1 = (2 * Math.random()) - 1
    x2 = (2 * Math.random()) - 1
    rad = (x1 * x1) + (x2 * x2)
  } while (rad >= 1 || rad === 0)
  const c = Math.sqrt((-2 * Math.log(rad)) / rad)
  return x1 * c
}

function generateFunctioningValue (valueType) {
  const randomValue = (Math.normalizedRandom() * valueType.variance) + valueType.baseValue
  const roundedValue = Math.round(randomValue * valueType.numberDecimals) / valueType.numberDecimals
  return Math.abs(roundedValue)
}

// sigmoid function
function generateBrokenValue (valueType, index) {
  // sigmoid formula
  const sigmoidDecayValue = valueType.baseValue /
    (1 + (Math.E ** ((valueType.decayRate * index) - valueType.beginDecayIndex)))
  // add noise
  let sigmoidDecayValueWithNoise
  if (sigmoidDecayValue > 20) {
    const VARIANCE_AMOUNT = 5
    sigmoidDecayValueWithNoise = sigmoidDecayValue + (Math.normalizedRandom() * VARIANCE_AMOUNT)
  } else {
    const VARIANCE_AMOUNT = 2
    sigmoidDecayValueWithNoise = sigmoidDecayValue + (Math.random() * VARIANCE_AMOUNT)
  }
  // round and absolute value
  const roundedValue = Math.round(sigmoidDecayValueWithNoise * valueType.numberDecimals)
    / valueType.numberDecimals
  return Math.abs(roundedValue)
}

function generateDatapoints (numDatapoints, isBroken = false) {

  const datapoints = []
  for (let i = 0; i < numDatapoints; i += 1) {
    const timestamp = generateTimestamp(i)
    const flow = isBroken ? generateBrokenValue(flowType, i) : generateFunctioningValue(flowType)
    const salinity = isBroken ? generateBrokenValue(salinityType, i) : generateFunctioningValue(salinityType)
    const turbidity = isBroken ? generateBrokenValue(turbidityType, i) : generateFunctioningValue(turbidityType)
    datapoints.push({
      timestamp,
      flow,
      salinity,
      turbidity,
    })
  }
  return datapoints
}

// ---------------------------------
// Generate JSON record
// ---------------------------------

function generateJson (communityName, datapoints) {
  const message = {
    messageId: generateMessageId(),
    body: [{
      community_name: communityName,
      datapoints,
    }],
  }
  return JSON.stringify(message)
}

module.exports = {
  generateFunctioningData (name) {
    return generateJson(name, generateDatapoints(24))
  },
  generateBrokenData (name) {
    return generateJson(name, generateDatapoints(24, true)) // true means well is broken
  },
  getRandomCommunityName () {
    return getRandomCommunityName()
  },
}
