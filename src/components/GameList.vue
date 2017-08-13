<template>
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
</template>

<script>
import Game from './Game'
import { initializeApp } from 'firebase'
import { orderBy, filter, take, includes } from 'lodash'
import Vue from 'vue'
import infiniteScroll from 'vue-infinite-scroll'
const PAGE = 20

var gamesRef = initializeApp({
  databaseURL: 'https://gogrussianprices.firebaseio.com'
}).database().ref('games')

window.Event = new Vue()

export default {
  name: 'game-list',
  directives: {
    infiniteScroll
  },
  components: {
    'game': Game
  },
  data () {
    return {
      gogGames: [],
      sales: [],
      listing: [],
      showing: [],
      searching: true,
      text: '',
      busy: false,
      emptySearch: false
    }
  },
  created () {
    gamesRef.orderByChild('isDiscounted').equalTo(true).once('value', snap => {
      this.sales = orderBy(snap.val(), 'title')
      this.listing = this.sales
      this.showing = take(this.listing, PAGE)
      this.searching = false
    })

    Event.$on('searchGame', searchText => {
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
      this.resultFound = this.listing.length === 0
    })
  },
  mounted () {
    gamesRef.once('value').then(snap => {
      this.gogGames = orderBy(snap.val(), 'title')
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
div#game-list {
  padding-top: 10px;
}
</style>
