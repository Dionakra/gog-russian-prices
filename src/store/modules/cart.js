import * as types from '../mutations'
import _ from 'lodash'

const state = {
  cart: []
}

// getters
const getters = {
  cartSize (state) {
    return state.cart.length
  },
  getSavings (state) {
    var savings = 0.0

    _.each(state.cart, (game) => {
      savings += game.priceES.finalAmount - game.price.finalAmount
    })

    return _.round(savings, 2)
  },
  getCart (state) {
    return state.cart
  }
}

const actions = {}

// mutations
const mutations = {
  [types.ADD_TO_CART] (state, { game }) {
    if (!_.some(state.cart, game)) {
      state.cart.push(game)
    }
  },
  [types.REMOVE_GAME] (state, { game }) {
    _.remove(state.cart, game)
    state.cart.splice(state.cart.length)
  },
  [types.REMOVE_ALL] (state) {
    state.cart = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
