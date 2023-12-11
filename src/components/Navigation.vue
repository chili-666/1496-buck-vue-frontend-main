<template>
  <div id="um-toggle-menu">
    <div class="d-flex flex-wrap align-items-center justify-content-center h-100">

      <div>
        <a href="" class="w-100"><img src="bilder/placeholder.jpg" alt="" class="profilbild"></a>
      </div>

      <div class="w-100">
        <router-link v-if="user.token == null" class="w-100" to="/">
          <h2>Login</h2>
        </router-link><br>
        <router-link v-if="user.token != null" class="w-100" to="/anlagen">
          <h2>Anlagenübersicht</h2>
          <div v-if="anlagen.length > 0">
            <div v-for="anlage in anlagen">
              <router-link :to="'/anlagen/details/' + anlage.id" @click.prevent="reloadPage">{{anlage.anlagenName}}</router-link>
<!--              <a v-bind:href="'/anlagen/details/' + anlage.id" target="_blank">{{anlage.anlagenName}}</a>-->
            </div>
          </div>
        </router-link><br>
        <a href="/" v-if="user.token != null" class="w-100" v-on:click.prevent="logOut()">
          <h2>Abmelden</h2>
        </a><br>
       </div>
      <div class="w-100">
        <router-link v-if="user.token != null" :to="'/einstellungen/' + user.id" class="w-100"><h2>Einstellungen</h2></router-link>

        <a href="#" class="w-100"><p>Datenschutz</p></a>
      </div>

    </div>
  </div>

</template>

<script>
import {SET_AUTHENTICATION} from "@/store/storeconstants";

export default {
  name: "Navigation",
  data() {
    return {
      user: '',
      anlagen: ''
    }
  },
  methods: {
    reloadPage(event) {
      event.preventDefault();
      window.location.href = event.target.href;
    },
    logOut() {
      $cookies.remove("token");
      $cookies.remove("id");
      this.$router.push('/')
    },
    getAnlagen() {
      const token = $cookies.get("token");
      const user = $cookies.get("id");
      // const token = 12345

      fetch('http://localhost:3001/anlagen/' + user + "/user", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "x-access-token": token,
          // "X-RapidAPI-Host": 'roomss-by-api-ninjas.p.rapidapi.com',
        },
      })
          .then(response => {
            if (response.status == 401) {
              this.$router.push('/')
            }
            response.json().then((data) => {
              data  = data['anlagen'];
              this.anlagen = data;
              // console.log("Anblagen", this.anlagen)
              // for (let i = 0; i < data.length; i++) {
              //   this.fetchRooms(data[i]['id'])
              // }

            });
          })
          .catch((err) => {
            console.error(err);
          });
    },

  },
  mounted() {
    const token = $cookies.get("token");
    const id = $cookies.get("id");
    this.user = {"id": id, "token": token}
    this.getAnlagen()


  }
}
</script>

<style scoped>

</style>
