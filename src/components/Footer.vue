<template>
<!--<div v-if="user.token != null">-->
<Navigation />
  <footer>
    <div class="um-footer-back pb-3 w-100">
      <div class="m-auto um-toggle-button d-flex align-items-center justify-content-center">
        <input type="checkbox" id="um-menuToggler" @click="toggleMenu()">
        <label for="menuToggler" class="menu-toggler">
          <span class="um-menu-toggler-line" id="toggle-line-1"> </span>
          <span class="um-menu-toggler-line" id="toggle-line-2"> </span>
        </label>

      </div>


    </div>
  </footer>
<!--</div>-->
</template>

<script>

import Navigation from '@/components/Navigation.vue';

export default {
  name: "Footer",
  data() {
    return {
      isLogin: false,
      user:''
    }
  },
  components: {Navigation},
  methods: {

    toggleMenu() {
      var menuCheckBox = document.getElementById("um-menuToggler");
      var ToggleMenu = document.getElementById("um-toggle-menu");
      var ToggleLine1 = document.getElementById('toggle-line-1');
      var ToggleLine2 = document.getElementById('toggle-line-2');
      if (menuCheckBox.checked == true){
        ToggleMenu.style.display="block";
        ToggleLine1.style.transform = "translate(0rem, 0.36rem) rotate(45deg)";
        ToggleLine2.style.transform = "translate(0rem, -0.36rem) rotate(-45deg)";



      } else {
        ToggleMenu.style.display="none";
        ToggleLine1.style.transform = "rotate(0deg) translate(0rem, 0rem)";
        ToggleLine2.style.transform = "rotate(0deg) translate(0rem, 0rem)";




      }
    }
  },
  mounted() {
    const token = $cookies.get("token");
    const id = $cookies.get("id");
    this.user = {"id": id, "token": token}
  }
}
</script>

<style scoped>

</style>
