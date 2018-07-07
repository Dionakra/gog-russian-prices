<template>
  <div class="card" :class="{green: inCart}">
    <div class="ui fluid image">
      <div v-if="game.isDiscounted" class="ui custom-blue ribbon label">
        Sale
      </div>
      <img alt="game photo" :src="img">
    </div>

    <div class="content">
      <div class="header">{{game.title}}</div>
      <div class="meta">
        <a>{{game.category}}</a>
      </div>
      <div class="description">
        <p>
          <i class="ru flag"></i>
          <a class="ui custom-green circular label">{{game.price.finalAmount}}</a>
          <a class="ui custom-red circular label" v-if="game.isDiscounted">{{game.price.baseAmount}}</a>
        </p>
        <p>
          <i class="es flag"></i>
          <a class="ui custom-green circular label">{{game.priceES.finalAmount}}</a>
          <a class="ui custom-red circular label" v-if="game.isDiscounted">{{game.priceES.baseAmount}}</a>
        </p>
      </div>
    </div>
    <div class="extra content">
      <span class="right floated" @click="addToCart(game)">
        <i class="large add to cart icon addToCart"></i>
      </span>
      <span>
        <a class="gog-link" target="noopener" :href="gogURL">
          <i class="large linkify icon"></i>
          Details
        </a>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import some from 'lodash/some'

export default {
  name: 'game',
  props: ['info'],
  data () {
    return {
      game: this.info
    }
  },
  methods: {
    ...mapGetters({
      getSavings: 'getSavings',
      getCart: 'getCart'
    }),
    ...mapActions([
      'addToCart'
    ])
  },
  computed: {
    img () {
      return this.game.image + '_200.jpg'
    },
    gogURL () {
      return 'https://www.gog.com' + this.game.url
    },
    inCart () {
      return some(this.getCart(), elem => elem.url == this.info.url)
    }
  }
}
</script>


<style scoped>
i.addToCart:hover {
  color: #1E824C
}
.meta > a {
  color: #000!important
}
.gog-link {
  color: #000!important;
}
</style>
