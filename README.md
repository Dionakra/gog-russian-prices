# GOG Russian Prices
 [![CircleCI](https://circleci.com/gh/Dionakra/gog-russian-prices/tree/master.svg?style=svg)](https://circleci.com/gh/Dionakra/gog-russian-prices/tree/master)
A web-app where you can see GOG Games in their Russian Prices, compare them to Spanish prices and see how much you can save when buying your favourite games on Spain or Russia.

## Install
``` bash
$ git clone https://github.com/Dionakra/gog-russian-prices.git
$ cd gog-russian-prices
$ npm install
```

## Develop
You can change whatever you want. This Vue template support hot reloading by default, so you really want to start developing with it enabled, so you can run this command to run a development server and see the changes you apply instantly in the browser without reloading the page. Awesome, isn't it?
``` bash
$ npm run dev
```

## Build
The template is build under Webpack, so you can generate a folder with the minified static content. In order to do so you just run:
``` bash
$ npm run generate
```

This will generate a `dist` folder that contains all your application, minified and ready for deployment.

## Deploy
In this project I just used Firebase as Cloud Database and Hosting service. To deploy it to Firebase, you just have to install the Firebase cli and deploy it with your credentials.
``` bash
$ npm install -g firebase-cli
$ firebase deploy
```

## Built with
* [Lodash](https://github.com/lodash/lodash) - Functionalities tool
* [vue-infinite-scroll](https://github.com/ElemeFE/vue-infinite-scroll) - Load content as the user scrolls down
* [Nuxt](https://nuxtjs.org/) - SSR Framework
