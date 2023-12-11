<template>
  <Header title="Einstellungen"/>

  <div class="um-content d-lg-block px-4">
    <h1>Persönliche Einstellungen</h1>
    <div class="d-flex flex-column justify-content-center align-items-center">
      <form class="col-8 mx-auto text-center startformular">

      <div class="row">
          <div class="mb-2 col-6 form-floating p-1">
            <input id="userVorname" type="text" class="form-control" placeholder="Vorname" aria-label="vorname"
                   aria-describedby="basic-addon1" v-model="user.first_name">
            <label for="userVorname" class="form-label">Vorname</label>
          </div>
        <div class="mb-2 col-6 form-floating p-1">
            <input id="userNachname" type="text" class="form-control" placeholder="Nachname" aria-label="nachname"
                   aria-describedby="basic-addon1" v-model="user.last_name">
          <label for="userNachname" class="form-label">Nachname</label>
          </div>
        <div class="mb-2 form-floating p-1 col-12">
          <input id="userEmail" type="text" class="form-control" placeholder="Email" aria-label="Email"
                 aria-describedby="basic-addon1" v-model="user.email">
          <label for="userEmail" class="form-label">Email</label>
        </div>
      </div>


        <div class="mb-3">
          <button class="btn btn-link">Speichern</button>

        </div>
      </form>
      <div class="w-25 border-top border-2 mb-3"></div>
      <router-link to="/anlagen">Abbrechen</router-link>
    </div>


  </div>
</template>

<script>
import { $router } from 'vue-router';
import Header from '@/components/Header.vue';
export default {
  name: "Einstellungen",
  components: {Header},
  data() {
    return {
      id: '',
      user:'',

    }
  },
  methods: {
    getUser() {
      // console.log("GETTING USer", this.id)
      const token = $cookies.get("token");

      fetch('http://localhost:3001/users/' + this.id, {
        method: "get",
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
              data = data['result'][0]
              this.user = data

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
    console.log("Route", id)
    this.id = id
    if (this.id != '') {
      this.getUser()
    }
  }
}
</script>

<style scoped>

</style>
