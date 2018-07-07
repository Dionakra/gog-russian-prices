<template>
  <div id="app" class="ui container">
    <!-- HEADER -->
    <banner-gog></banner-gog>
    <div class="ui divider"></div>

    <!-- SEARCH BAR -->
    <search-bar></search-bar>
    <cart-list></cart-list>
    <div class="ui divider"></div>

    <div id="game-list">
      <div v-if="searching" class="ui active centered inline loader">
      </div>

      <h1 v-if="emptySearch" class="ui header centered">
        No results looking for: {{text}}
      </h1>

      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100" class="ui five doubling cards link">
        <template v-for="game in showing">
          <game :info="game" :key="game.url"></game>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '~/components/Banner.vue'
import SearchBar from '~/components/SearchBar.vue'
import CartList from '~/components/CartList.vue'
import Game from '~/components/Game'
import axios from 'axios'

import orderBy from 'lodash/orderBy'
import filter from 'lodash/filter'
import take from 'lodash/take'
import includes from 'lodash/includes'
const PAGE = 20

export default {
  async asyncData(context) {
    const { data } = await axios.get('https://gogrussianprices.firebaseio.com/games/.json')

    const gogGames = orderBy(data, 'title')
    const sales = filter(gogGames, {'isDiscounted': true })

    return {
      gogGames,
      sales,
      showing: sales.slice(0, PAGE),
      listing: sales,
      searching: false,
      emptySearch: sales.length == 0
    }
  },
  data () {
    return {
      gogGames: [],
      sales: [],
      listing: [],
      showing: [],
      searching: false,
      text: '',
      busy: false,
      emptySearch: false
    }
  },
  name: 'app',
  components: {
    'game': Game,
    'banner-gog': Banner,
    'search-bar': SearchBar,
    'cart-list': CartList
  },
  mounted () {
    this.$root.$on('searchGame', searchText => {
      this.searching = true
      this.text = searchText

      if (searchText) {
        this.listing = filter(this.gogGames, o => {
          return includes(o.title.toLowerCase(), searchText.toLowerCase())
        })
      } else {
        this.listing = this.sales
      }
      this.showing = take(this.listing, PAGE)

      this.searching = false
      this.emptySearch = this.listing.length === 0
    })
  },
  methods: {
    loadMore () {
      this.showing = take(this.listing, this.showing.length + PAGE)
    }
  }
}
</script>

<style>
.custom-blue{
  background-color: #2574A9!important;
  color: #fff!important;
}
.custom-green{
  background-color: #1E824C!important;
  color: #fff!important;
}

.custom-red{
  background-color: #96281B!important;
  color: #fff!important;
}
div#game-list {
  padding-top: 10px;
}
</style>
