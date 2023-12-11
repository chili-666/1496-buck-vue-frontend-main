<template>
  <div class="container position-relativ">
    <router-view/>
  </div>
<!--  <div v-if="isNotLogin">-->
<!--      <Footer />-->
<!--  </div>-->
</template>

<script>
import { useStore } from 'vuex'
import {IS_USER_AUTHENTICATED} from "./store/storeconstants";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import Back from "@/components/SingleComponents/Back.vue";

export default {
  components: {Back, Navigation, Footer},
  data() {
    return {
      auth: false,
      showMenu: false,
      isNotLogin: false
    }
  },
  computed: {
    auth () {
      return $cookies.get("token");
      // Or return basket.getters.fruitsCount
      // (depends on your design decisions).
    }
  },
  watch: {
    auth (newAuth, oldAuth) {
      console.log("AUTH", auth).
      this.isLogin = false
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    checkToken() {
      const token = $cookies.get("token");
      if (!token) {
        this.isNotLogin = true;
      }
    },
  },
  mounted() {
    this.checkToken()

  }
}

</script>

<style>
#app {
  font-family: Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #606060;
}

nav {
  padding: 10px;
}

.logo {
  width: 200px;
  height: auto;
}

</style>
