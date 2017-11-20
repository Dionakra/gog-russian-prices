<template>
  <div id="app" class="ui container">
    <!-- HEADER -->
    <header-gog></header-gog>
    <div class="ui divider"></div>

    <!-- SEARCH BAR -->
    <search-bar></search-bar>
    <cart-list></cart-list>
    <div class="ui divider"></div>

    <game-list></game-list>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import SearchBar from './components/SearchBar.vue'
import GameList from './components/GameList.vue'
import CartList from './components/CartList.vue'

export default {
  name: 'app',
  components: {
    'header-gog': Header,
    'search-bar': SearchBar,
    'game-list': GameList,
    'cart-list': CartList
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
</style>
