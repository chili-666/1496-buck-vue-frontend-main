<template>
  <div class="container">
    <div v-if="!loaded"  class="d-flex flex-row justify-content-center align-items-center">
      <Spinner />
    </div>
    <small>Temperatur der letzten 7 Tage</small>
    <Line v-if="loaded" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import Spinner from "@/components/SingleComponents/Spinner.vue";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default {
  name: 'TinyChart',
  components: {Spinner, Line },
  props: {
    id: {
      type: Number,
      required: true
    },
  },
  data: () => ({
    loaded: false,
    chartData: {
      labels: [],
      datasets: [
        {
          label: 'Temperatur',
          backgroundColor: '#f87979',
          borderColor: 'ed',
          data: []
        },

      ]
    },
    data: '',
    rooms: '',
    chartOptions: {
      responsive: true,
      pan: {
        // Boolean to enable panning
        enabled: false,

        // Panning directions. Remove the appropriate direction to disable
        // Eg. 'y' would only allow panning in the y direction
        mode: 'xy'
      },
      // Container for zoom options
      zoom: {
        // Boolean to enable zooming
        enabled: true,

        // Zooming directions. Remove the appropriate direction to disable
        // Eg. 'y' would only allow zooming in the y direction
        mode: 'xy',
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          min: 16,
          max: 30
        },


      },
      plugins: {
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true
            },
            mode: 'xy',
          }
        },
        legend: {
          display: false,
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
    }
  }),
  watch: {
    id: {
      handler: function(newId) {
        this.fetchData(newId);
      },
      deep: true
    }
  },
  methods: {
    fetchData() {
      let push = {
        labels: [],
        datasets: [
          {
            label: 'Temperatur',
            backgroundColor: '#f87979',
            borderColor: 'red',
            data: []
          }
        ]
      }

      const token = $cookies.get("token");
      // const token = 12345
      fetch('http://localhost:3001/rooms/' + this.id + "/temperature/day", {
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
              console.log("Daily DATA", data);
              // data = data['result']
              this.data = data


              const endDate = new Date()
              const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

              endDate.setHours(23);
              endDate.setMinutes(59);
              endDate.setSeconds(0);
              let oldDate = '';
              let value = 0;
              let count = 0;
              // this.chartData['labels'] = []
              for (let i = 0; i < data.length; i++) {
                let dateCheck = new Date(data[i].date)

                if (dateCheck.getTime() >= startDate.getTime() && dateCheck.getTime() <= endDate.getTime()) {
                  console.log("DATA", data[i])
                  const date = new Date(data[i].time); // convert to Date object
                  const newDate = dateCheck.toISOString().slice(0, 10);
                    // value = value + data[i].temperature
                    count++

                  // } else {
                     this.chartData['labels'].push(newDate)
                     this.chartData['datasets'][0]['data'].push(data[i].avg_temp.toFixed(1))
                     this.chartData['datasets'][0]['cubicInterpolationMode'] = 'monotone'
                    value = this.data[i].temperature
                    count = 1
                    oldDate = newDate
                  // }
                  // this.chartData.push(push)
                }

              }


              console.log("Chart", this.chartData)
              this.loaded = true;
            });
          })
          .catch((err) => {
            console.error(err);
          });
    },
  //   fetchRooms(anlage) {
  //     const token = $cookies.get("token");
  //     fetch('http://localhost:3001/anlagen/' + anlage +'/rooms', {
  //       method: "GET",
  //       headers: {
  //         "Accept": "application/json",
  //         "Content-type": "application/json",
  //         "x-access-token": token,
  //
  //       },
  //     })
  //         .then(response => {
  //           if (response.status == 401) {
  //             this.$router.push('/')
  //           }
  //           response.json().then((data) => {
  //             this.rooms = data
  //             this.rooms.forEach((room) => {this.fetchDevices(room)})
  //           });
  //         })
  //   },
  //
  // fetchDevices(room) {
  //   const token = $cookies.get("token");
  //   fetch('http://localhost:3001/devices/' + room.id + '/room', {
  //     method: "GET",
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-type": "application/json",
  //       "x-access-token": token,
  //     }
  //   })
  //       .then(response => console.log("The devices are: ", response))
  //
  // },
  },
  mounted() {
    // this.fetchRooms(this.id)
    this.fetchData()
  },

}
</script>

<style scoped>

</style>
