const express = require('express');
const dataGenerator = require('./data-generator');

const app = express();

app.get('/', (req, res) => {
  res.send(`Hello. Generate data with the endpoints:
              - /api/functioning/random-community
              - /api/functioning/community/:communityName
              - /api/broken/random-community
              - /api/broken/community/:communityName `);
});

app.get('/api/functioning/random-community', (req, res) => {
  const communityName = dataGenerator.getRandomCommunityName();
  const data = dataGenerator.generateFunctioningData(communityName);
  res.send(data);
});

app.get('/api/functioning/community/:communityName', (req, res) => {
  const communityName = req.params.communityName;
  const data = dataGenerator.generateFunctioningData(communityName);
  res.send(data);
});

app.get('/api/broken/random-community', (req, res) => {
  const communityName = dataGenerator.getRandomCommunityName();
  const data = dataGenerator.generateBrokenData(communityName);
  res.send(data);
});

app.get('/api/broken/community/:communityName', (req, res) => {
  const communityName = req.params.communityName;
  const data = dataGenerator.generateBrokenData(communityName);
  res.send(data);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Well Data Generator app listening on port 3000!');
});

