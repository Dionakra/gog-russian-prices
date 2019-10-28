<template>
  <div class="card">
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
export default {
  name: 'game',
  props: ['info'],
  data () {
    return {
      game: this.info
    }
  },
  computed: {
    img () {
      return this.game.image + '_200.jpg'
    },
    gogURL () {
      return 'https://www.gog.com' + this.game.url
    }
  }
}
</script>


<style scoped>
.meta > a {
  color: #000!important
}
.gog-link {
  color: #000!important;
}
</style>
