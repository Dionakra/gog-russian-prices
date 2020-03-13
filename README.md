# GOG Russian Prices 
A WebApp where you can see the price of a given game on GOG's platform in the Spanish and Russian region, so you can compare the difference in the price and choose where to buy the game.

## How does it work?
Using GitHub actions and a cron job, it obtains the prices for all games from Spanish and Russian regions and saves them in the repo. Using that information, a simple web consumes this data to show the best deals when it comes to regional pricing between those countries

## Development workflow
``` bash
# Installation
git clone https://github.com/Dionakra/gog-russian-prices.git
cd gog-russian-prices
npm install
npm i -g firebase-cli

# Development with Hot Reloading
npm run dev

# Deploying
npm run build
firebase deploy
```

## Built with
* [Svelte](https://svelte.dev/) - Frontend Framework
* [Tailwind](https://tailwindcss.com/) - CSS Framework
