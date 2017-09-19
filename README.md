# GOG Russian Prices
A progressive web-app where you can see GOG Games in their Russian Prices, compare them to Spanish prices and see how much you can save when buying your favourite games on Spain or Russia.

__This app has been built over the PWA template from VueJS__, you can find it [here](https://github.com/vuejs-templates/pwa). This template includes a lot of cool stuff, like hot module reloading and PWA support.

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
$ npm run build
```

This will generate a ```dist``` folder that contains all your application, minified and ready for deployment.

## Deploy
In this project I just used Firebase as Cloud Database and Hosting service. To deploy it to Firebase, you just have to install the Firebase cli and deploy it with your credentials. 
``` bash
$ npm install -g firebase-cli
$ firebase deploy
```

## Built with
* [Firebase](https://www.npmjs.com/package/firebase) - Cloud Database
* [Lodash](https://github.com/lodash/lodash) - Functionalities tool
* [Vue.js 2.0](https://vuejs.org/) - Frontend Framework
* [vue-infinite-scroll](https://github.com/ElemeFE/vue-infinite-scroll) - Load content as the user scrolls down
* [vue-lazyload](https://github.com/hilongjw/vue-lazyload) - Lazy loading the images for better performance
* [vue-router](https://github.com/vuejs/vue-router) - Official VueJS router for SPAs.
* [vuex](https://github.com/vuejs/vuex) - Centralized state management for Vue
* [vuex-persitedstate](https://github.com/robinvdvleuten/vuex-persistedstate) - Persisting tool for Vuex. Prevent Vuex to lose its information when the browser has been refreshed.
