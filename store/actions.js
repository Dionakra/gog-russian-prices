import * as types from './mutations'

export const addToCart = ({ commit }, game) => {
  commit(types.ADD_TO_CART, {
    game: game
  })
}

export const removeFromCart = ({ commit }, game) => {
  commit(types.REMOVE_GAME, {
    game: game
  })
}

export const removeAll = ({ commit }) => {
  commit(types.REMOVE_ALL)
}
