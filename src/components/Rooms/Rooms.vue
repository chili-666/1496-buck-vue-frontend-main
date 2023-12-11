<template>
      <div v-if="!loaded">
        <Spinner />
      </div>
      <div v-if="loaded">
        <div v-if="rooms.length > 0">
<!--          <div class="d-flex justify-content-center">-->
            <div v-for="(room, index) in rooms">
              <room :room=room :index=index />
            </div>
<!--          </div>-->
        </div>
        <div v-else>
          Keine Räume gefunden
        </div>
        <div class="container">
          <router-link :to="'/anlagen/details/' + this.id +'/create-room'"><button>+ Raum anlegen</button></router-link>
        </div>
      </div>
</template>

<script>
import {  GET_USERNAME } from "../../store/storeconstants";
import Room from '@/components/Rooms/Room.vue'
import Spinner from '@/components/SingleComponents/Spinner.vue'

export default {
  components: {Spinner, Room},
  name: 'Rooms',
  props: ['anlagenId'],
  data() {
    return {
      id: '',
      rooms: "",
      hasId: false,
      loaded: false,
      hasNoGateways: false
    }
  },
  watch: {
    // id(newId, oldId) {
    //   if (this.id != '') {
    //     this.hasId = true
    //   }
    // },
    //
      id(newId, oldId) {
        if (newId != oldId) {
          // console.log("Changing Anlage")
          this.fetchData()
        }
      }

  },
  methods:{
    getUsername() {
      return this.$store.getters[`auth/${GET_USERNAME}`]
    },
    // getGateway(anlage) {
    //   console.log("Anlage", anlage)
    //   const token = $cookies.get("token");
    //   fetch('http://localhost:3001/anlagen/' + anlage + '/gateways', {
    //     method: "GET",
    //     headers: {
    //       "Accept": "application/json",
    //       "Content-type": "application/json",
    //       "x-access-token": token,
    //       // "X-RapidAPI-Host": 'roomss-by-api-ninjas.p.rapidapi.com',
    //     },
    //   })
    //       .then(response => {
    //         if (response.status == 401) {
    //           this.$router.push('/')
    //         }
    //         response.json().then((data) => {
    //           console.log("Gateways", data)
    //           if (data.length < 1) {
    //             this.hasNoGateways = true;
    //           }
    //
    //         });
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //       });
    // },
    fetchData() {
      const token = $cookies.get("token");
         let data = this.anlagenId
      fetch('http://localhost:3001/rooms/anlage/' + this.id, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "Access-Control-Allow-Origin":"*",
          "x-access-token": token,

        }
      })
          .then(response => {
            if (response.status == 401) {
              this.$router.push('/')
            }
            response.json().then((data) => {
              this.rooms = data['result'];
              this.loaded = true;

            });
          })
          .catch((err) => {
            console.error(err);
          });
    },
  },
  mounted() {

    this.id = this.$route.params.id
    // console.log("The ID", this.id)
      this.fetchData()
      // this.getGateway(this.id)
    setInterval(this.fetchData, 1000)
  },





}
</script>
