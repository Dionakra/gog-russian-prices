<template>
  <div id="app" class="ui container">
    <!-- HEADER -->
    <div id="header">
      <h2 class="ui header centered">
        <img alt="logo" src="~/static/logo.png" />
        <div class="content">
          GOG Russian Prices
          <div class="sub header">Where you can save on GOG.com</div>
        </div>
      </h2>
    </div>
    <!-- END HEADER -->

    <div class="ui divider"></div>

    <!-- SEARCH BAR -->
    <div class="ui centered grid">
      <div id="search" class="ui search middle aligned content">
        <div class="ui icon input">
          <input
            aria-label="search"
            class="prompt"
            type="text"
            v-model="searchText"
            @keyup="search"
            placeholder="Search game..."
          />
          <i class="search icon"></i>
        </div>
      </div>
    </div>
    <!-- END SEARCH BAR -->

    <div class="ui divider"></div>

    <!-- GAME LIST -->
    <div id="game-list">
      <div v-if="searching" class="ui active centered inline loader"></div>

      <h1
        v-if="!searching && showing.length == 0"
        class="ui header centered"
      >No results looking for: {{searchText}}</h1>

      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="100"
        class="ui five doubling cards link"
      >
        <template v-for="game in showing">
          <game :info="game" :key="game.id"></game>
        </template>
      </div>
    </div>
    <!-- END GAME LIST -->
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import Game from "~/components/Game";
import axios from "axios";
const PAGE = 20;

export default {
  data() {
    return {
      games: [],
      curPage: 1,
      searchText: "",
      showing: [],
      searching: true
    };
  },
  name: "app",
  components: {
    game: Game
  },
  mounted() {
    axios
      .get("https://gogrussianprices.firebaseio.com/products/.json")
      .then(response => {
        this.games = Object.values(response.data);
        this.showing = this.filterGames();
      });
  },
  methods: {
    loadMore() {
      if (!this.searching) {
        this.curPage++;
        this.showing = this.filterGames();
      }
    },
    filterGames() {
      const term = this.searchText;
      this.searching = true;
      let res = [];
      if (this.games) {
        res = this.games
          .filter(game => {
            let res = false;

            if (term) {
              res = game.t.toLowerCase().includes(term.toLowerCase());
            } else {
              res = game.s;
            }

            return res;
          })
          .sort((a, b) =>
            a.t.toLowerCase().localeCompare(b.t.toLowerCase())
          )
          .slice(0, PAGE * this.curPage);
      }
      this.searching = false;
      return res;
    },
    search: debounce(function() {
      this.curPage = 1;
      this.showing = this.filterGames();
    }, 500)
  }
};
</script>

<style>
.custom-blue {
  background-color: #2574a9 !important;
  color: #fff !important;
}
.custom-green {
  background-color: #1e824c !important;
  color: #fff !important;
}

.custom-red {
  background-color: #96281b !important;
  color: #fff !important;
}
div#game-list {
  padding-top: 10px;
}
div#header {
  padding-top: 10px;
}
div#search {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
