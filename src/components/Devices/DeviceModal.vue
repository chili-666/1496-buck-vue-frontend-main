<template>
  <div>
    <button @click="toggleModal">Thermostate</button>
    <div class="popup-background" v-if="showModal == 1">
     <div class="d-flex flex-column justify-content-center align-items-center">
        <div class="popup">
      <div class="popup-dialog">
        <div class="popup-content ">
          <div class="popup-header d-flex flex-row justify-content-between ">
            <h5 class="popup-title" id="exampleModalLabel">Thermostate</h5>
            <div class="text-end">
<!--            <button type="button" class="btn-close" @click="toggleModal" aria-label="Schliessen"></button>-->
            </div>
          </div>
          <div class="popup-body py-5 px-3">
            <div v-if="loaded = 1">
              <div class="zugeordnete">
                <div class="accordion" id="accordionZugeordnete">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <strong>Zugeordnete Thermostate</strong>
                      </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionZugeordnete">
                      <div class="accordion-body">
                          <div class="row">
                            <div class="col-3">ID</div>
                            <div class="col-3">Name</div>
                            <div class="col-2">Batteriestatus</div>
                            <div class="col-2 text-end">Zugeordnet</div>
                            <div class="col-1 text-end"></div>
                          </div>
                          <div v-for="(device, index) in devices">

                            <div v-if="device['assigned'] == true" class="row" :class="{ batterydanger: device['hasDanger']}">
                              <div class="col-3">{{device.deviceId}}</div>
                              <div class="col-3 device-edit"  v-if="!device.isEdit" >
                                  <div @click="changeEdit(index)">{{device.name}}</div>
                              </div>
                              <div class="col-3" v-else>
                                <div class="d-flex flex-row align-items-center justify-content-start">
                                    <div class="col-8">
                                    <input type="text" class="form-control" placeholder="Gerätebezeichnung" v-model="devices[index]['name']">
                                    </div>
                                </div>
                              </div>
                              <div class="col-2 d-flex flex-row justify-content-center align-items-center"><div class="um-loading-area mx-2 w-50" :style="cssVars(index)"></div>{{ device.batteryState }} %</div>
                              <div class="col-2">
                                <div class="col-12 form-check-reverse form-switch mb-4">
                                   <input @click="checkClick" class="form-check-input" type="checkbox" role="switch" id="device.id" v-model="devices[index]['assigned']">
                                </div>
                              </div>
                              <div class="col-1">
                                <div class="col-12 form-check-reverse form-switch mb-4">
                                  <i class="bi bi-pencil-square" @click="changeEdit(index)" v-if="!device.isEdit"></i>
                                  <i class="bi bi-check-circle" @click="saveModal(index)" v-if="device.isEdit"></i>
                                  <i class="bi bi-x-circle" @click="changeEdit(index)" v-if="device.isEdit"></i>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="freie mt-5">
              <div class="accordion" id="accordionFreie">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                      <strong>Verfügbare Thermostate</strong>
                    </button>
                  </h2>
                  <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionFreie">
                    <div class="accordion-body">
                      <div class="row">
                        <div class="col-3">ID</div>
                        <div class="col-3">Name</div>
                        <div class="col-2">Batteriestatus</div>
                        <div class="col-2 text-end">Zugeordnet</div>
                        <div class="col-1 text-end"></div>
                      </div>
                      <div v-for="(device, index) in devices">

                        <div v-if="device['assigned'] == false" class="row" :class="{ batterydanger: device['hasDanger']}">
                          <div class="col-3">{{device.deviceId}}</div>
                          <div class="col-3 device-edit"  v-if="!device.isEdit" >
                            <div @click="changeEdit(index)">{{device.name}}</div>
                          </div>
                          <div class="col-3" v-else>
                            <div class="d-flex flex-row align-items-center justify-content-start">
                              <div class="col-8">
                                <input type="text" class="form-control" placeholder="Gerätebezeichnung" v-model="devices[index]['name']">
                              </div>
                            </div>
                          </div>
                          <div class="col-2 d-flex flex-row justify-content-center align-items-center"><div class="um-loading-area mx-2 w-50" :style="cssVars(index)"></div>{{ device.batteryState }} %</div>
                          <div class="col-2">
                            <div class="col-12 form-check-reverse form-switch mb-4">
                              <input @click="checkClick" class="form-check-input" type="checkbox" role="switch" id="device.id" v-model="devices[index]['assigned']">
                            </div>
                          </div>
                          <div class="col-1">
                            <div class="col-12 form-check-reverse form-switch mb-4">
                              <i class="bi bi-pencil-square" @click="changeEdit(index)" v-if="!device.isEdit"></i>
                              <i class="bi bi-floppy" @click="saveModal(index)" v-if="device.isEdit"></i>
                              <i class="bi bi-x-circle" @click="changeEdit(index)" v-if="device.isEdit"></i>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="loaded = 0">
              <Spinner />
            </div>

          </div>
          <div class="popup-footer mt-5">
            <button class="btn btn-link" @click="toggleModal">Abbrechen</button>
            <button type="button" @click="saveModal(9999999)">Speichern</button>
          </div>
        </div>
      </div>
    </div>
     </div>
    </div>
<!--  </div>-->
<!--  </div>-->
</template>

<script>
import Spinner from "@/components/SingleComponents/Spinner.vue";
export default {
  name: "DeviceModal",
  components: {Spinner},
  props: ['roomId', 'anlagenId'],
  data() {
    return {
      showModal: false,
      devices: [],
      isLoaded: 0,
      unassignedDevices: '',
      assignedDevices: [],
      hasDanger: []
    }
  },
  methods: {
    changeEdit(index) {
      console.log("EDIT", this.devices[index])

      // this.devices[index]['name'] = ''
      // if (this.devices[index]['isEdit'])
      this.devices[index]['isEdit'] = !this.devices[index]['isEdit']
    },
    checkClick() {
      console.log("Checking", this.devices)
    },
    toggleModal() {
      this.showModal = !this.showModal
      if (this.showModal == 1) {
        this.devices = []
         this.getDevices(this.roomId)
        this.getUnassignedDevices()
      }

    },
    saveModal(close) {

      let saveDevices = []
      for (let i = 0; i < this.devices.length; i++) {
        if (this.devices[i]['assigned'] == true) {
          this.devices[i]['roomId'] = this.roomId
        } else {
          this.devices[i]['roomId'] = 0
        }
        saveDevices.push(this.devices[i])
      }
      for (let i = 0; i < saveDevices.length; i++) {

        this.updateDevice(saveDevices[i])
      }
      if (close == 9999999) {
        this.toggleModal()
      } else {
        this.changeEdit(close)
      }
    },
    getUnassignedDevices() {
      // this.loaded = false
      const token = $cookies.get("token");
      fetch('http://localhost:3001/devices/unassigned', {
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
              this.unassignedDevices = data['devices']
              for (let i = 0; i < this.unassignedDevices.length; i++) {
                this.unassignedDevices[i]['assigned'] = false
                this.devices.push(this.unassignedDevices[i])
              }
              // this.loaded = true;
            });
          })
          .catch((err) => {
            console.error(err);
          });
    },
    updateDevice(device) {
      const token = $cookies.get("token");
      const data = {'name': device.name, "roomId": device.roomId, "anlagenId": this.roomId}
      fetch('http://localhost:3001/devices/' + device.id, {
        method: "put",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "x-access-token": token,
          // "X-RapidAPI-Host": 'roomss-by-api-ninjas.p.rapidapi.com',
        },
        body: JSON.stringify(data),
      })
    },
    getDevices(roomId) {
      this.loaded = 0;
      const token = $cookies.get("token");
      fetch('http://localhost:3001/devices/' + roomId + '/room', {
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
             for (let i = 0; i < data.length; i++) {
                data[i]['assigned'] = true;
                if (data[i]['batteryState'] < 15) {
                  data[i]['hasDanger'] = true
                } else {
                  data[i]['hasDanger'] = false
                }
                data[i]['isEdit'] = false
                this.devices.push(data[i])

              }
              this.loaded = 1;

            });
          })
          .catch((err) => {
            console.error(err);
          });
    },
    cssVars(i) {
      let display = "block"
      let color = "green"

      if (this.devices[i].batteryState <= 50) {
        color = 'yellow'
      }
      if (this.devices[i].batteryState <= 30) {
        color = 'orange'
      }
      if (this.devices[i].batteryState <= 10) {
        color = 'red'
      }

      if (!this.devices[i].batteryState) {
        display = 'none'
      }
      return {
        '--display': display,
        '--percentage': this.devices[i].batteryState + "%",
        // '--percentage': "99%",
        "--accent1" : color
      }
    }
  },
  computed: {

  }
  // mounted() {
  //   this.roomId =
  // }
}
</script>

<style scoped>
.fade {
  opacity: 1;
}
.popup-background {
  position:absolute;
  left: 0;
  top: 0;
  z-index:1000;
  width:100%;
  height:100%;
  background:RGBA(0,0,0,.7);
  position: fixed;
  overflow-y: scroll;
}


.popup {
  margin-top: 10vh;
  width: 80%;
  /*min-height: 80vh;*/
  background: white;
  padding:2em;
  border-radius:5px;
  box-shadow:10px 10px 10px black;
  margin-left:auto;
  margin-right: auto;
}

.popup-dialog {
  min-height: 100%;

}

.um-loading-area{
  display: var(--display);
  width: 9rem;
  height: .6rem;
  border: solid 1px var(--third);
  border-radius: 1rem;
  background: linear-gradient(90deg, var(--accent1) var(--percentage), #ffffff00 var(--percentage));

}

.batterydanger {
  /*border:1px solid red;*/
  background: lightyellow;
  border-radius: 5px;
}

.device-edit {
  cursor:pointer;
}

.accordion-button{
  background: var(--secondary)
}
.accordion-button:not(.collapsed) {
  background: var(--secondary)
}
</style>
