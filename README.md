# Well Data Generator

Simple JavaScript app that generates random data from a simulated clean water well, and exposes the data through API endpoints.

## public API endpoints
* [well-data-generator.herokuapp.com/api/functioning/random-community](https://well-data-generator.herokuapp.com/api/functioning/random-community)
* [well-data-generator.herokuapp.com/api/functioning/community/<name>](https://well-data-generator.herokuapp.com/api/functioning/community/<name>)
* [well-data-generator.herokuapp.com/api/broken/random-community](https://well-data-generator.herokuapp.com/api/broken/random-community)
* [well-data-generator.herokuapp.com/api/broken/community/<name>](https://well-data-generator.herokuapp.com/api/broken/community/<name>)

## To install locally
1. `npm install`

## To run locally
1. `npm start`
1. Open `localhost:3000` on browser.
1. Access the above endpoints, replacing `well-data-generator.herokuapp.com` with `localhost:3000`.

#### API Routes
* `localhost:3000/api/functioning/random-community`
* `localhost:3000/api/functioning/community/<name>`
* `localhost:3000/api/broken/random-community`
* `localhost:3000/api/broken/community/<name>`
