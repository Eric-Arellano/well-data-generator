const express = require('express');
const dataGenerator = require('./data-generator');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/random', (req, res) => {
  res.send(dataGenerator.generateJsonForRandomCommunity());
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

