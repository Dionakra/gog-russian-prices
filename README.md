# GOG Russian Prices [![CircleCI](https://circleci.com/gh/Dionakra/gog-russian-prices/tree/master.svg?style=svg)](https://circleci.com/gh/Dionakra/gog-russian-prices/tree/master)
A WebApp where you can see the price of a given game on GOG's platform in the Spanish and Russian region, so you can compare the difference in the price and choose where to buy the game.

## How does it work?
There is a Firebase Function (placed at `./functions`) which exploits GOG's RESTful API. Using that API, setting the correct cookie values for retrieving Russian or Spanish prices, I can extract the status of every videogame sold at GOG. After retrieving all the data from both Spanish and Russian, we join and filter the data, keeping just the necessary for the web.

The function follows a polite approach to data extraction, throttling requests so the server is not overwhelmed.

## Development workflow
``` bash
# Installation
git clone https://github.com/Dionakra/gog-russian-prices.git
cd gog-russian-prices
npm install
npm i -g firebase-cli

# Development with Hot Reloading
npm run serve

# Deploying
npm run build
firebase deploy
```

## Built with
* [VueJS 3.0](https://vuejs.org/) - Frontend Framework
* [Lodash](https://github.com/lodash/lodash) - Functionalities tool
* [vue-infinite-scroll](https://github.com/ElemeFE/vue-infinite-scroll) - Load content as the user scrolls down
