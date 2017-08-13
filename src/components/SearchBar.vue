<template>
  <div class="ui centered grid">
    <div id="search" class="ui search middle aligned content">
      <div class="ui icon input">
        <input aria-label="search" class="prompt" type="text" v-model="searchText" @keyup="search"   placeholder="Search game...">
        <i class="search icon"></i>
      </div>
    </div>
    <cart></cart>
  </div>
</template>

<script>
import Vue from 'vue'
import Cart from './Cart'
import { debounce } from 'lodash'

window.Event = new Vue()

export default {
  name: 'search-bar',
  components: {
    'cart': Cart
  },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    search: debounce(function () {
      Event.$emit('searchGame', this.searchText)
    }, 500)
  }
}
</script>

<style scoped>
div#search{
  padding-top: 8px;

}
</style>
