<template>
  <div v-if="loaded">
      <router-link :to="'/anlagen/details/' + anlage.id">
        <div class="px-4 py-3 um-inhalts-box border d-flex flex-wrap align-items-center mt-4 justify-content-between">
          <div class="d-flex justify-content-between w-100">
            <div><h2>{{anlage['anlagenName']}}</h2></div>
            <i class="bi bi-pencil-square"></i>
<!--            <div class="um-loading rounded-5 border border-5"></div>-->
            <div>
<!--              <TinyChart :id="anlage.id" />-->
            </div>
          </div>
          <div v-if="temps > 0">
              <p class="w-100">Temperatur</p>
            <div class="d-flex flex-row">
              <p><strong>18 °C </strong></p> <div class="um-loading-area mx-2" :style="cssVars"></div> <p><strong> 24 °C</strong></p>
            </div>
          </div>

          <div class="row mt-4 text-center w-100">
            <div class="col-5 px-1"><div class="border rounded-pill um-raeume"><p>{{rooms.length}}  Räume</p></div></div>
            <div class="col-5 px-1"><div class="border rounded-pill border-accent1"><p>Fenster {{windows}}</p></div></div>
          </div>
        </div>
     </router-link>
  </div>
  <div v-else>
    <Spinner />
  </div>

</template>

<script>
import Spinner from "@/components/SingleComponents/Spinner.vue";
// import TinyChart from "@/components/Anlagen/TinyChart.vue";
export default {
  name: "Anlage",
  components: {Spinner},
  props: ['anlage'],
  data() {
    return {
      rooms: "",
      temps: 0,
      windows: 0,
      percent: 0,
      loaded: false
    }
  },
  mounted() {
    this.id = this.$route.params.id
     this.fetchRooms(this.anlage['id'])
     // this.getGateway(this.anlage['id'])
  },
  methods: {
    fetchRooms(anlage) {
      const token = $cookies.get("token");
      fetch('http://localhost:3001/anlagen/' + anlage +'/rooms', {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "x-access-token": token,

        },
      })
          .then(response => {
            if (response.status == 401) {
              this.$router.push('/')
            }
            response.json().then((data) => {
              this.rooms = data
              for (let i = 0; i < this.rooms.length; i++) {
                  this.temps = this.temps + this.rooms[i]['currentTemp']
                  if (this.rooms[i]['windowState'] == 1) {
                    this.windows++;
                  }
              }
              if (this.temps > 0) {
                this.temps = this.temps / this.rooms.length
                this.temps = this.temps.toFixed()
              }
              const difference = 6
              const currentDiff = this.temps - 18
              let percent = (100/6) * currentDiff
              this.percent = percent.toFixed()



              this.loaded = true;
            });
          })
    },
  },

  computed: {
      cssVars() {

        let color = "green"
        if (this.percent > 60) {
          color = 'orange'
        }
        if (this.percent > 100) {
          color = 'red'
        }
        return {
          '--percentage': this.percent + "%",
          "--accent1" : color
        }
      }
  }
}
</script>

<style scoped>
.um-loading-area{
  width: 9rem;
  height: .6rem;
  border: solid 1px var(--third);
  border-radius: 1rem;
  background: linear-gradient(90deg, var(--accent1) var(--percentage), #ffffff00 var(--percentage));

}
</style>
