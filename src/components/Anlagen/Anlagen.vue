<template>
<Header title="Anlagen"/>

  <div class="um-content px-4">
    <div v-for="anlage in anlagen">
      <Anlage :anlage=anlage />
    </div>
    <div class="col-12 mt-4">
      <router-link class="btn btn-link" to="/anlagen/neu">
        <button>+ Neue Anlage</button>
      </router-link>
    </div>
  </div>

</template>

<script>
import {GET_USERNAME} from "@/store/storeconstants";
import Anlage from '@/components/Anlagen/Anlage.vue';
import Header from '@/components/Header.vue';

export default {
  name: "Anlagen",
  components: {Anlage, Header},
  data() {
    return {
      anlagen: "",
      rooms: ""
    }
  },
  methods:{
    fetchAnlagen() {
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
  beforeMount() {
    this.fetchAnlagen()
    // for (let i = 0; i < this.anlagen; i++) {
    //   this.fetchRooms(this.anlagen[i]['anlagenId'])
    // }
  }
}
</script>

<style scoped>

</style>
