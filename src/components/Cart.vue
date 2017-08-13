<template>
  <div class="column" @click="toggleCart" >
    <i id="basket" class="big shopping basket icon item"></i>
    <div class="mini ui bottom right attached circular custom-green label">{{cartSize}}</div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

window.Event = new Vue()

export default {
  name: 'cart',
  computed: {
    ...mapGetters({
      cartSize: 'cartSize'
    })
  },
  methods: {
    toggleCart () {
      Event.$emit('toggleCart')
    }
  }

}
</script>

<style scoped>
i#basket:hover {
  color: #27ae60;
  cursor: pointer;
}
</style>
