<template>
  <div class="container p-1 p-lg-5">
    <div>
      <VueDatePicker locale="de" cancelText="abbrechen" selectText="auswählen" :enable-time-picker="true" v-model="date" range />
    </div>
    <div v-if="!loaded"  class="d-flex flex-row justify-content-center align-items-center">
    <Spinner />
    </div>
    <div v-if="chartData">
    <Line v-if="loaded" :data="chartData" :options="chartOptions"/>
    <Line v-if="windowLoaded" :data="windowChartData" :options="windowChartOptions"/>
    </div>
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
import { ref, onMounted } from 'vue';
import { Line } from 'vue-chartjs'
import zoom from 'chartjs-plugin-zoom';
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
  name: 'BarChart',
  components: {Spinner, Line },
  props: {
    id: {
      type: Number,
      required: true
    },
    // start:'',
    // end:''
  },
  data: () => ({
    format: '',
    date: ref(),
    loaded: false,
    windowLoaded: false,
    chartData: {
      labels: [],
      datasets: []
    },
    windowChartData: {
      labels: [],
      datasets: []
    },
    data: '',
    chartOptions: {
      responsive: true,
      pan: {
        // Boolean to enable panning
        enabled: true,

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
          id: 'temperature-y-axis',
          type: 'linear',
          display: true,
          position: 'left',
          stack: 'demo',
          stackWeight: 2,
          min: 16,
          max: 30,
        },
        y2: {
          id: 'windows-y-axis',
          type: 'category',
          labels: ['Offen', 'Zu'],
          offset: true,
          position: 'left',
          stack: 'demo',
          stackWeight: 1,
          border: {
            color: "#1e71f7"
          }
        }

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
          position: 'top'
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
    },
    windowChartOptions: {
    responsive: true,
    pan: {
      // Boolean to enable panning
      enabled: true,

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
      // y: {
      //   id: 'temperature-y-axis',
      //   type: 'linear',
      //   display: true,
      //   position: 'left',
      //   stack: 'demo',
      //   stackWeight: 2,
      //   min: 16,
      //   max: 30,
      // },
      y: {
        id: 'windows-y-axis',
        type: 'category',
        labels: ['Offen', 'Zu'],
        offset: true,
        position: 'left',
        stack: 'demo',
        stackWeight: 1,
        border: {
          color: "#1e71f7"
        }
      }

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
        position: 'top'
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
  }
  }),
  mounted() {
    const endDate = new Date();
    const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
    this.date = [startDate, endDate];
  },
  watch: {
    id: {
      handler: function(newId) {
        // this.fetchData(newId);
        // this.fetchDataPerMinute(newId);
        this.fetchMinuteTemp(newId)
        this.fetchWindows(newId)

      },
      deep: true
    },
    date(newDate, oldDate) {
      this.filterData()
    }
  },
  methods: {
    fetchMinuteTemp(id) {
      let push =
          {
            label: 'Temperatur',
            backgroundColor: '#f87979',
            borderColor: '#f87979',
            borderWidth: 2,
            data: [],
            pointStyle: false,
            cubicInterpolationMode : 'monotone'
          }

      const token = $cookies.get("token");
      // const token = 12345

      fetch('http://localhost:3001/rooms/' + id + "/temperature/minutes", {
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

              const startDate = new Date(this.date[0])
              const endDate = new Date(this.date[1])
              // endDate.setHours(23);
              // endDate.setMinutes(59);
              // endDate.setSeconds(0);
              let oldDate = '';
              let value = 0;
              let count = 0;

              for (let i = 0; i < data.length; i++) {
                let dateCheck = new Date(data[i].time_interval)

                if (dateCheck.getTime() >= startDate.getTime() && dateCheck.getTime() <= endDate.getTime()) {
                  const date = new Date(data[i].time_interval); // convert to Date object
                  // const newDate = date.toISOString().slice(0, 10);
                  const newDate = date.toISOString();

                  let tag = date.getDate();
                  let month = date.getMonth() +1
                  let year = date.getFullYear()
                  let hours = date.getHours()
                  let minutes = date.getMinutes().toString().padStart(2, '0');
                  let chartDate = tag + "." + month + "." + year +" | " + hours + ":" + minutes
                    // let chartDate = date.getTime();
                  this.chartData['labels'].push(chartDate)
                    // push['labels'].push(chartDate)

                    push['data'].push(data[i].avg_temp.toFixed(1))



                  }

                }
              this.chartData['datasets'].push(push)
              console.log("Temperature", push, this.chartData)
              this.loaded = true;
            })
          })
    },
    filterData() {

      if( this.chartData && this.loaded) {
        let push = {
          labels: [],
          datasets: [
            {
              label: 'Temperatur',
              backgroundColor: '#f87979',
              data: []
            }
          ]
        }

        const startDate = new Date(this.date[0])
        const endDate = new Date(this.date[1])
        // endDate.setHours(23);
        // endDate.setMinutes(59);
        // endDate.setSeconds(0);
        let oldDate = '';
        let value = 0;
        let count = 0;

        for (let i = 0; i < this.data.length; i++) {
          let dateCheck = new Date(this.data[i].time)

          if (dateCheck >= startDate && dateCheck <= endDate) {
            const date = new Date(this.data[i].time); // convert to Date object
            // const newDate = date.toISOString().slice(0, 10);
            const newDate = date.toISOString();

            if (oldDate == '') {
              oldDate = newDate
            }
            // console.log("oldDate", oldDate)
            if (oldDate == newDate) {
              value = value + this.data[i].temperature
              count++

            } else {
              push['labels'].push(oldDate)
              push['datasets'][0]['data'].push((value / count).toFixed())
              push['datasets'][0]['cubicInterpolationMode'] = 'monotone'
              value = this.data[i].temperature
              count = 1
              oldDate = newDate
            }

          }

        }
        this.chartData = push
      }
    },
    fetchData() {
      let push = {
        labels: [],
        datasets: [
          {
            label: 'Temperatur',
            pointStyle: false,
            backgroundColor: '#f87979',
            data: []
          }
        ]
      }

      const token = $cookies.get("token");
      // const token = 12345

      fetch('http://localhost:3001/rooms/' + this.id + "/temperature", {
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

              data = data['result']
              this.data = data
              let oldDate = '';
              let value = 0;
              let count = 0;
            if (this.data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              const date = new Date(data[i].time); // convert to Date object
              const newDate = date.toISOString().slice(0, 10);

              if (oldDate == '') {
                  oldDate = newDate
              }
              // console.log("oldDate", oldDate)
              if (oldDate == newDate) {
                value = value + data[i].temperature
                count++

              } else {
                push['labels'].push(oldDate)
                push['datasets'][0]['data'].push((value/count).toFixed())
                push['datasets'][0]['cubicInterpolationMode'] = 'monotone'
                value = data[i].temperature
                count = 1
                oldDate = newDate
              }

              }

              this.chartData = push
              this.loaded = true;
            }


            });
          })
          .catch((err) => {
            console.error(err);
          });
    },
    fetchDataPerMinute() {
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

      fetch('http://localhost:3001/rooms/' + this.id + "/temperature", {
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
              this.data = data;
              let oldDate = '';
              let value = 0;
              let count = 0;

              if (this.data) {

                for (let i = 0; i < data.length; i++) {
                  const date = new Date(data[i].time); // convert to Date object
                  const newDate = date.toISOString();

                  if (oldDate == '') {
                    oldDate = newDate
                  }
                  // console.log("oldDate", oldDate)
                  if (oldDate == newDate) {
                    value = value + data[i].temperature

                    count++
                  } else {
                    push['labels'].push(newDate)
                    push['datasets'][0]['data'].push((value / count).toFixed())
                    push['datasets'][0]['cubicInterpolationMode'] = 'monotone'
                    value = data[i].temperature
                    count = 1
                    oldDate = newDate
                  }
                }
                this.chartData = push
                // this.loaded = true;
              }
            });
          })
          .catch((err) => {
            console.error(err);
          });
    },
    fetchWindows() {
      let push =
          {
            label: 'Fenster',
            backgroundColor: '#0c15c7',
            borderColor: '#0c15c7',
            // cubicInterpolationMode : 'monotone',
            borderWidth: 2,
            stepped: true,
            data: []
          }



      const token = $cookies.get("token");
      // const token = 12345

      fetch('http://localhost:3001/rooms/' + this.id + "/windows", {
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

              const startDate = new Date(this.date[0])
              const endDate = new Date(this.date[1])
              console.log("Data", data)
              for (let i = 0; i < data.length; i++) {
                let dateCheck = new Date(data[i].time_interval)

                if (dateCheck.getTime() >= startDate.getTime() && dateCheck.getTime() <= endDate.getTime()) {
                  const date = new Date(data[i].time_interval); // convert to Date object
                  // const newDate = date.toISOString().slice(0, 10);
                  const newDate = date.toISOString();

                  let tag = date.getDate();
                  let month = date.getMonth() + 1
                  let year = date.getFullYear()
                  let hours = date.getHours()
                  let minutes = date.getMinutes().toString().padStart(2, '0');
                  let chartDate = tag + "." + month + "." + year + " | " + hours + ":" + minutes
                  // let chartDate = date.getTime()
                  //
                  // let index = this.chartData['labels'].findIndex((time) => time <= chartDate)
                  // console.log("INDEX", index)
                  // if (index === -1) {
                    this.windowChartData['labels'].push(chartDate);
                  // } else {
                  //   // Otherwise, insert the new time value at the appropriate index
                  //   this.chartData['labels'].splice(index, 0, chartDate);
                  // }
                  // let state = ''
                  // for (let i = 0; i < this.chartData['labels']; i++) {
                  //   if (data[0].state == 1) {
                  //     state = 'Offen'
                  //   } else {
                  //     state = 'Zu'
                  //   }
                  //   if (this.chartData['labels'] < chartDate) {
                  //     push['data'].push(state)
                  //   } else {
                  //     if (data[i].state == 1) {
                  //       state = 'Offen'
                  //     } else {
                  //       state = 'Zu'
                  //     }
                  //     push['data'].push(state)
                  //   }
                  // }

                    if (data[i].state == 0.000) {
                      push['data'].push('Zu')
                    } else {
                      push['data'].push('Offen')
                    }

                }
              }

              this.chartData['datasets'].push(push)
              this.windowChartData['datasets'].push(push)
              console.log("Windows", this.chartData)
              this.windowLoaded = true;

            });
          })
          .catch((err) => {
            console.error(err);
          });
    },
  }


}
</script>
