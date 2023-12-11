<template>
  <router-link :to="'/anlage/raum/details/' + room.id">
    <div class="px-4 py-4 um-inhalts-box border d-flex flex-wrap align-items-center me-2 mb-2" v-bind:class="{'no-device': hasNoDevices }">
      <div class="d-flex justify-content-between w-100" v-if="!hasNoDevices">
        <div>
          <h2>{{room.name}}</h2>
        <p class="w-100" v-if="temp != 0">Temperatur</p>
        <p class="w-100" v-else>Bitte warten Sie ab, bis die ersten Daten übertragen wurden. Das kann bis zu 5 Minuten dauern.</p>
        <div class="big me-3" v-if="temp != 0">{{temp.temperature.toFixed()}}°C</div>
        <div class="big me-3" v-else>N/A°C</div>
        <p v-if="room.targetTemp != NULL"> Ziel Temperatur: <strong> {{room.targetTemp}} °C</strong></p>
        <div class="row mt-4 text-center w-100">

          <div class="col-12 px-1">

            <div v-if="room.windowState == 1">
              <div class="border rounded-pill border-accent1 bg-accent2">
                Fenster offen
              </div>
            </div>
            <div v-else>
              <div class="border rounded-pill border-accent1">
                Fenster geschlossen
              </div>
            </div>
          </div>
        </div>
      </div>
        <div class="tiny-chart col-6" v-if="!hasNoDevices">
<!--          <TinyChart :id="room.id" />-->
        </div>
      </div>
      <div v-else>
        <h2>{{room.name}}</h2>
        <p class="w-100 me-5">
          Keine Geräte zugeordnet!
        </p>
      </div>
    </div>
  </router-link>

</template>

<script>
import TinyChart from '@/components/SingleComponents/TinyChart.vue';
export default {
  name: "Room",
  props: ['room', 'index'],
  data() {
    return {
      hasNoDevices: false,
      temp: 0
    }
  },
  components: {TinyChart},
  methods: {
    fetchTemperature(room) {
      const token = $cookies.get("token");
      // const token = 12345
      fetch('http://localhost:3001/rooms/' + this.room.id + "/temperature", {
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

              if (data.length) {
                this.temp = data[data.length - 1]
              }
            })
          })

    },
    fetchDevices(room) {
      const token = $cookies.get("token");
      fetch('http://localhost:3001/devices/' + room.id + "/room", {
        method: "get",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "x-access-token": token,
          // "X-RapidAPI-Host": 'roomss-by-api-ninjas.p.rapidapi.com',
        }
    })
          .then(response => {
            if (response.status == 401) {
              this.$router.push('/')
            }
            response.json().then((data) => {
              console.log(data['result'])
              room['devices'] = data['result']
              if (data['result'].length <= 0) {
                this.hasNoDevices = true;
              }
            });
          })
          .catch((err) => {
            console.error(err);
          });
    }
  },
  created: function () {
    console.log("RoomData", this.room)

    // console.log('Room data from parent component:', this.index)
    // console.log(this.room) //prints out an empty string
  },
  mounted: function() {
    this.fetchDevices(this.room)
    this.fetchTemperature(this.room)

  }
}
</script>

<style scoped>
.tiny-chart {

}

.no-device {
  border: 2px solid var(--bs-danger) !important;
  background: white;
}
</style>
