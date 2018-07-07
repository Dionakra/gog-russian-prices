import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import cart from './modules/cart'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    actions,
    getters,
    modules: {
      cart
    }
  })
}

export default createStore
