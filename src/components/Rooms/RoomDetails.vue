<template>
  <Header :title="room.name" :temp="temp.temperature" />

  <div class="um-content px-4 mb-5">
    <div class="w-100">
      <div class="d-flex flex-row flex-wrap justify-content-between align-content-between mb-2">
        <div>
          <h2 class="d-flex flex-row flex-wrap">
            <span v-if="editName == 0">{{room.name}}</span>
            <span v-if="editName == 1"><input type="text" class="form-control" placeholder="Name" aria-label="anlagenName" aria-describedby="basic-addon1" v-model="roomName"></span>

            <i v-if="editName == 0" class="bi bi-pencil-square" @click="changeName"></i>
          </h2>
        </div>
        <div>
           <button @click="saveRoom" :class="{change: changes}">Speichern</button>
        </div>
      </div>
      <div class="d-flex flex-row flex-wrap justify-content-between align-content-between">
        <div class="d-flex flex-row flex-wrap mb-4">
          <span v-if="editDescription == 0"> <p class="">{{room.description}}</p></span>
          <span v-if="editDescription == 1">
            <textarea type="text" class="form-control" :placeholder="room.description" aria-label="description" aria-describedby="basic-addon2" rows="2" cols="50" v-model="description"></textarea>
          </span>
          <i v-if="editDescription == 0" class="bi bi-pencil-square" @click="changeDescription"></i>
        </div>
           <DeviceModal :roomId="id" :anlagenId="room.anlagenId"/>
      </div>
      <div class="d-flex flex-row justify-content-between align-content-between">
          <div v-if="room.windowState != 1">
          <span class="rounded-pill border border-2 border-accent1 px-3 py-1">Fenster ist geschlossen</span>
          </div>
          <div v-else>
            <span class="rounded-pill border border-2 border-accent1 px-3 py-1 bg-accent1">Fenster ist offen</span>
          </div>

      </div>
      <BarChart :id="id"/>
    </div>
    <div class="row">
    <div class="col-6">
      <div class="row mb-4">
      <div class="col-4 me-5">
        <p class="small">Ziel Temperatur</p>
        <div class="d-flex flex-row justify-content-between">
          <span class="big my-auto pe-0 um-grad-anzeige">{{ formattedTargetTemp }}&#176;C</span>
          <div class="btn-group-vertical col-2 ps-0" role="group" aria-label="Basic example">
            <button :disabled="increaseTarget == 0" type="button" class="btn um-knopfmehr p-0" @click="increaseTemp('target')"><img class="um-arrowsvg p-0 m-0" src="/img/icons/arrow.svg"></button>
            <button :disabled="decreaseTarget == 0" type="button" class="btn um-knopfweniger p-0" @click="decreaseTemp('target')"><img class="um-arrowsvg um-arrowdown p-0 m-0" src="/img/icons/arrow.svg"></button>
          </div>
        </div>
      </div>
      <div class="col-4 ms-4">
        <p class="small">bei offenem Fenster</p>
        <div class="d-flex flex-row justify-content-between">
          <span class="big my-auto pe-0 um-grad-anzeige">{{ formattedWindowOpenTemp}}&#176;C</span>
          <div class="btn-group-vertical col-2 ps-0" role="group" aria-label="Basic example">
            <button :disabled="increaseWindowOpen == 0" type="button" class="btn um-knopfmehr p-0" @click="increaseTemp('window')"><img class="um-arrowsvg p-0 m-0" src="/img/icons/arrow.svg"></button>
            <button :disabled="decreaseWindowOpen == 0" type="button" class="btn um-knopfweniger p-0" @click="decreaseTemp('window')"><img class="um-arrowsvg um-arrowdown p-0 m-0" src="/img/icons/arrow.svg"></button>
          </div>
        </div>
      </div>
    </div>
    </div>
      <div class="col-6">
    <div class="row mb-5 pb-5 um-form-checks">
      <div class="col-12 form-check-reverse form-switch mb-2">
        <input class="form-check-input" type="checkbox" role="switch" id="urlaubsmodus" v-model="urlaub">
        <label class="form-check-label my-auto" for="urlaubsmodus">Urlaubsmodus</label>
      </div>
      <div class="col-12 form-check-reverse form-switch mb-2">
        <input class="form-check-input" type="checkbox" role="switch" id="boostmodus" v-model="boost">
        <label class="form-check-label" for="boostmodus">Boostmodus</label>
      </div>

      <div class="col-12 form-check-reverse form-switch mb-2">
        <input class="form-check-input" type="checkbox" role="switch" id="whispermode" v-model="whisper">
        <label class="form-check-label" for="whispermode">Whispermodus</label>
      </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
//

import BarChart from "@/components/Rooms/TempChart.vue";
import Header from "@/components/Header.vue";
import DeviceModal from "@/components/Devices/DeviceModal.vue";

export default {
  name: "RoomDetails",
  components: {BarChart, Header, DeviceModal},
  props: ['prop1'],
  data() {
    return {
      changes: 0,
      editName: false,
      editDescription: false,
      roomName: '',
      description: '',
      id: '',
      room:'',
      urlaub: 0,
      boost: 0,
      whisper: 0,
      targetTemp: 0,
      increaseTarget: true,
      decreaseTarget:true,
      windowOpenTemp: 0,
      increaseWindowOpen: true,
      decreaseWindowOpen:true,
      temp: 0

    }
  },
  watch: {
    urlaub() {
      console.log("ChangeUrelaube", this.urlaub)
    },
    targetTemp(newValue, oldValue){
      if (newValue <= 16) {
        this.decreaseTarget = false
      } else {
        this.decreaseTarget = true
      }
      if (newValue >= 28) {
        this.increaseTarget = false
      } else {
        this.increaseTarget = true
      }

      if (oldValue != 0 && newValue != oldValue) {
        this.changes = 1
      }
      console.log("TempChange", this.changes, newValue, oldValue)
    },
    windowOpenTemp(newValue, oldValue){
      if (newValue <= 16) {
        this.decreaseWindowOpen = false
      } else {
        this.decreaseWindowOpen = true
      }
      if (newValue >= 28) {
        this.increaseWindowOpen = false
      } else {
        this.increaseWindowOpen = true
      }
      if (oldValue != 0 && newValue != oldValue) {
        this.changes = 1
      }
      console.log("WindowChange", this.changes)
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.fetchData()
    this.fetchTemperature(this.id)
    setInterval(this.fetchData, 60000)
  },
  computed: {
    formattedTargetTemp() {
        return this.targetTemp.toFixed(1);
    },
    formattedWindowOpenTemp() {
      if (this.windowOpenTemp) {
        return this.windowOpenTemp.toFixed(1);
      }
    }
  },
  methods:{
    saveRoom() {
      console.log("Saving room")
      const token = $cookies.get("token");
      if (this.whisper == true) {
        this.whisper = 1
      } else {
        this.whisper = 0
      }
      const data = {'name': this.roomName, "roomId": this.id, "whisperMode": this.whisper, "mode": this.boost, "targetTemp": this.targetTemp, "windowOpenTemp": this.windowOpenTemp, "description": this.description}
      fetch('http://localhost:3001/rooms/' + this.id, {
        method: "put",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "x-access-token": token,
          // "X-RapidAPI-Host": 'roomss-by-api-ninjas.p.rapidapi.com',
        },
        body: JSON.stringify(data),
      })
      this.editName = false;
      this.editDescription = false;
      this.fetchData()
      this.changes = false;
    },
    changeName() {
      this.editName = true;
    },
    changeDescription() {
      this.editDescription = true;
    },
    increaseTemp(target) {

      if (target == "target") {
        this.targetTemp = this.targetTemp + 0.5
      }
      if (target == "window") {
        this.windowOpenTemp = this.windowOpenTemp + 0.5
      }

    },
    decreaseTemp(target) {

      if (target == "target") {
        this.targetTemp = this.targetTemp - 0.5
      }
      if (target == "window") {
        this.windowOpenTemp = this.windowOpenTemp - 0.5
      }
    },
    fetchTemperature(room) {
      const token = $cookies.get("token");
      // const token = 12345
      fetch('http://localhost:3001/rooms/' + room + "/temperature", {
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
                console.log("TEMP?", data[data.length - 1])
                this.temp = data[data.length - 1]
              }
            })
          })

    },
    fetchData() {
      const token = $cookies.get("token");
      // const token = 12345

      fetch('http://localhost:3001/rooms/' + this.id, {
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
              this.room = data['result'][0];
              this.targetTemp = this.room.targetTemp
              this.windowOpenTemp = this.room.windowOpenTemp
              // console.log("Room", this.room.targetTemp)
              if (this.room.mode == 1) {
                this.boost = true
              }

              if (this.room.whisperMode == 1) {
                this.whisperMode = true
              }
              this.roomName = this.room.name
              this.description = this.room.description
            });
          })
          .catch((err) => {
            console.error(err);
          });
    },
  },
}
</script>

<style scoped>
.change {
  background: red;
}
</style>
