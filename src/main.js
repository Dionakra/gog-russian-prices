import Vue from 'vue'
import App from './App'
import VueLazyload from 'vue-lazyload'
import store from './store'
import '../node_modules/semantic-ui-css/semantic.min.css'

Vue.config.productionTip = false

const EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  lazyComponent: true
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
