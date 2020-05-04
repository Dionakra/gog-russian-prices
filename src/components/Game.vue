<template>
  <div class="card" @click="openLink()">
    <div class="ui fluid image">
      <div v-if="game.s" class="ui custom-blue ribbon label">Sale</div>
      <img alt="game photo" :src="img" />
    </div>

    <div class="content">
      <div class="header">{{game.t}}</div>
      <div class="meta">
        <a>{{game.c}}</a>
      </div>
      <div class="description">
        <p>
          <i class="ru flag"></i>
          <a class="ui custom-green circular label">{{game.pR.f}}</a>
          <a class="ui custom-red circular label" v-if="game.s">{{game.pR.b}}</a>
        </p>
        <p>
          <i class="es flag"></i>
          <a class="ui custom-green circular label">{{game.p.f}}</a>
          <a class="ui custom-red circular label" v-if="game.s">{{game.p.b}}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "game",
  props: ["info"],
  data() {
    return {
      game: this.info
    };
  },
  methods: {
    openLink() {
      var win = window.open(this.gogURL, "_blank");
      win.focus();
    }
  },
  computed: {
    img() {
      return this.game.i + "_200.jpg";
    },
    gogURL() {
      return "https://www.gog.com" + this.game.u;
    }
  }
};
</script>


<style scoped>
.meta > a {
  color: #000 !important;
}
.gog-link {
  color: #000 !important;
}
</style>
