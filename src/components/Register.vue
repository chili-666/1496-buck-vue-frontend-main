<template>
  <div class="container mt-3 buck-container">
    <h2>Register</h2>
    <form name="login-form" class="">
      <div className="mb-3">
        <label htmlFor="firstname" class="form-label">Vorname: </label>
        <input class="form-control" type="text" id="firstname" v-model="input.firstname" />
      </div>
      <div className="mb-3">
        <label htmlFor="lastname" class="form-label">Nachname: </label>
        <input class="form-control" type="text" id="lastname" v-model="input.lastname" />
      </div>
      <div className="mb-3">
        <label htmlFor="email" class="form-label">Ihre Email: </label>
        <input class="form-control" type="text" id="email" v-model="input.email" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" class="form-label">Password: </label>
        <input class="form-control" type="password" id="password" v-model="input.password" />
      </div>
      <button className="btn btn-primary" type="submit" v-on:click.prevent="register()">
        Register
      </button>
    </form>
  </div>
  <h3>{{ this.output }}</h3>

</template>

<script>
import { useStore } from 'vuex'
import { SET_AUTHENTICATION, SET_USERNAME } from "../store/storeconstants";
import md5 from 'md5'

export default {
  name: 'RegisterView',
  data() {
    return {
      allFields: true,
      input: {
        email: "",
        password: "",
        firstname: "",
        lastname: ""
      },
      output: "",

    }
  },
  methods: {
    register() {
      console.log(this.input.email, this.input.password, this.input.firstname, this.input.lastname)
      if (this.input.email != "" && this.input.password != "" && this.input.firstname != "" && this.input.lastname != "") {
        const user = {'email' : this.input.email, 'password': this.input.password, 'first_name': this.input.firstname, 'last_name': this.input.lastname}
        console.log(user)
        this.axios.post("http://localhost:3001/users/register", user)
            .then(response => {
              console.log("Da", response)
              this.$router.push('/anlagen')
              this.output = response.data.message;
            })
            // .then(response => localStorage.setItem("token", response.data))
      } else {
        this.output = "Bitte alle Felder ausfüllen!"
      }
      //make sure username OR password are not empty
      // if (this.input.username != "" || this.input.username != "") {
      //   function username(name) {
      //
      //     return name.username == this.input.username
      //   }
      //  this.users = this.users.filter((name) => {
      //     return name.username == this.input.username
      //   })
      //  if (this.users[0].password == md5(this.input.password)) {
      //    this.output = "Authentication complete"
      //    //stores true to the set_authentication and username to the set_username
      //    this.$store.commit(`auth/${SET_AUTHENTICATION}`, true);
      //    this.$store.commit(`auth/${SET_USERNAME}`, this.input.username);
      //    this.output = "Authentication complete."
      //    this.$router.push('/home')
      //  } else {
      //    this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
      //    this.output = "Username oder Passwort falsch"
      //  }
      // } else {
      //   this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
      //   this.output = "Username and password can not be empty"
      // }
    },
  },


}
</script>
