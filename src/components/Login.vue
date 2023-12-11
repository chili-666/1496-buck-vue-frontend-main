<template>
  <div class="container wrapper position-relative">
<!--    <div class="position-absolute top-0 start-0 ms-3 mt-3">-->
<!--      <a href="" class="h-100 w-100 d-flex"><img src="bilder/placeholder.jpg" alt="" class="profilbild"></a>-->
<!--    </div>-->
    <div class="d-flex flex-column justify-content-center align-items-center h-100 ">
      <form class="col-8 mx-auto text-center startformular">


        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="E-Mail" aria-label="E-Mail" id="username" v-model="input.username"
                 aria-describedby="basic-addon1">
        </div>

        <div class="input-group mb-3">
          <input type="password" class="form-control" placeholder="Passwort" aria-label="Passwort" id="password" v-model="input.password"
                 aria-describedby="basic-addon2">

        </div>
        <div class="mb-3">
          <button className="btn btn-link" type="submit" v-on:click.prevent="login()">
            Anmelden
          </button>
        </div>
      </form>
      <div class="w-25 border-top border-2 mb-3"></div>
      <p class="">Noch keinen Account?</p>
      <router-link  to="/register">Registrieren</router-link>
    </div>
  </div>
  <h3>{{ this.output }}</h3>

</template>

<script>
import { useStore } from 'vuex'
import { SET_AUTHENTICATION, SET_USERNAME } from "../store/storeconstants";
import md5 from 'md5'

export default {
  name: 'LoginView',
  data() {
    return {
      input: {
        username: "",
        password: ""
      },
      output: "",

    }
  },
  // mounted() {
  //   import('../assets/data.json').then(data => {
  //     this.users = data.default
  //   })
  // },
  methods: {
    login() {
      if (this.input.username != "" || this.input.password != "") {
        const user = {'email' : this.input.username, 'password': this.input.password}
        console.log("1111",user)
        // fetch('http://localhost:3001/users/login', {
        //   method: "PUT",
        //   headers: {
        //     "Accept": "application/json",
        //     "Content-type": "application/json",
        //     // "x-access-token": token,
        //     // "X-RapidAPI-Host": 'roomss-by-api-ninjas.p.rapidapi.com',
        //   },
        //   body: JSON.stringify(user),
        // }).then(response => {
        //   console.log("Login???", response)
        // })
        this.axios.put("http://localhost:3001/users/login", user)
            .then(response => {
              console.log("response", response.data)
              if (response.data.message === 'Wrong password or email') {
                console.log("KENN ICH NICHT!")
              }
              else if (response.data.message === 'User doesn\'t exist. Please register') {
                console.log("Please register")
              } else {
                $cookies.set("token", response.data.message.token)
                $cookies.set("id", response.data.message.id)

                this.$router.push('/anlagen')
              }
            })
      }

    },
  },


}
</script>
