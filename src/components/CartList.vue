<template>
  <div v-if="show">
    <div class="ui divider"></div>
    <h1 v-if="getCart.length === 0" class="ui header centered">
      No items in basket yet :(
    </h1>

    <div v-else>
      <div class="ui labeled button">
        <div class="ui green button">
          <i class="dollar icon"></i> Savings
        </div>
        <a class="ui basic green left pointing label">
          {{getSavings}}
        </a>
      </div>

      <button @click="removeAll" class="right floated  ui youtube button">
        <i class="delete icon"></i>
        Remove all
      </button>

      <table class="ui sortable celled striped table">
        <thead>
          <tr><th>Game</th>
          <th>Price <i class="flag ru"></i></th>
          <th>Price <i class="flag es"></i></th>
          <th>Savings <i class="ui icon dollar"></i></th>
        </tr></thead>
        <tbody>
          <tr v-for="game in getCart" :key="game.url">
            <td>
              {{game.title}}
              <div class="meta">
                <a @click="removeFromCart(game)" class="reply">Remove</a>
              </div>
            </td>
            <td>{{game.price.finalAmount}}</td>
            <td>{{game.priceES.finalAmount}}</td>
            <td>{{savings(game)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import { round } from 'lodash'
import { mapGetters, mapActions } from 'vuex'

window.Event = new Vue()

export default {
  name: 'cart-list',
  computed: {
    ...mapGetters({
      getSavings: 'getSavings',
      getCart: 'getCart'
    })
  },
  data () {
    return {
      show: false
    }
  },
  created () {
    Event.$on('toggleCart', () => {
      this.show = !this.show
    })
  },
  methods: {
    savings (game) {
      return round(game.priceES.finalAmount - game.price.finalAmount, 2)
    },
    ...mapActions({
      removeFromCart: 'removeFromCart',
      removeAll: 'removeAll'
    })
  }
}
</script>
