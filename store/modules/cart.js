import * as types from '../mutations'
import each from 'lodash/each'
import round from 'lodash/round'
import some from 'lodash/some'
import remove from 'lodash/remove'

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

    each(state.cart, (game) => {
      savings += game.priceES.finalAmount - game.price.finalAmount
    })

    return round(savings, 2)
  },
  getCart (state) {
    return state.cart
  }
}

const actions = {}

// mutations
const mutations = {
  [types.ADD_TO_CART] (state, { game }) {
    if (!some(state.cart, game)) {
      state.cart.push(game)
    }
  },
  [types.REMOVE_GAME] (state, { game }) {
    remove(state.cart, game)
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
