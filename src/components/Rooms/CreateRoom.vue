<template>
  <Header title="Raum erstellen"/>
  <div class="um-content d-lg-block px-4">
    <div class="d-flex flex-column justify-content-center align-items-center">
      <h3>Raum erstellen für Anlage:</h3>
      <h2>{{anlage.anlagenName}}</h2>
      <form class="col-10 mx-auto text-center startformular">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Name" aria-label="anlagenName"
                 aria-describedby="basic-addon1" v-model="name">
        </div>
        <div class="input-group mb-3">
                    <textarea type="text" class="form-control" placeholder="Beschreibung" aria-label="description"
                              aria-describedby="basic-addon2" rows="3" v-model="description"></textarea>

        </div>

         Verfügbare Geräte in dieser Anlage:


        <div class="accordion" id="accordionThermostate">
              <div class="accordion-item">
                <h2 class="accordion-header" id="thermostate">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThermostate" aria-expanded="true" aria-controls="collapseThermostate">
                    <strong>Heizungsthermostate</strong>
                  </button>
                </h2>
                <div id="collapseThermostate" class="accordion-collapse collapse" aria-labelledby="thermostate" data-bs-parent="#accordionThermostate">
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-1">
                        Zuweisen
                      </div>

                      <div class="col-4">
                        GeräteId
                      </div>
                      <div class="col-5">
                        Bezeichnung
                      </div>
                      <div class="col-2"></div>
                    </div>
                    <div v-for="(device, index) in devices">
                      <div v-if="device.type == 1">
                        <div class="row">
                          <div class="col-1">
                            <input type="checkbox" class="form-check-input" v-model="selectedDevices" :name="device.name" :id="device.name" :value="device.id">
                          </div>
                          <div class="col-4">
                            {{ device.id }}
                          </div>
                          <div class="col-5" v-if="!device.isEdit">
                            {{device.name}}
                          </div>
                          <div class="col-5" v-else>
                            <input type="text" class="form-control-sm" placeholder="Gerätebezeichnung" v-model="devices[index]['name']">
                          </div>
                          <div class="col-2">
                            <i class="bi bi-pencil-square" @click="changeEdit(index)" v-if="!device.isEdit"></i>
                            <i class="bi bi-check-circle" @click="saveDevice(index)" v-if="device.isEdit"></i>
                            <i class="bi bi-x-circle" @click="changeEdit(index)" v-if="device.isEdit"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        <div class="accordion" id="accordionFenster">
          <div class="accordion-item">
            <h2 class="accordion-header" id="fenster">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFenster" aria-expanded="true" aria-controls="collapseFenster">
                <strong>Fenstersensoren</strong>
              </button>
            </h2>
            <div id="collapseFenster" class="accordion-collapse collapse" aria-labelledby="fenster" data-bs-parent="#accordionFenster">
              <div class="accordion-body">
                <div class="row">
                  <div class="col-1">
                    Zuweisen
                  </div>

                  <div class="col-4">
                    GeräteId
                  </div>
                  <div class="col-5">
                    Bezeichnung
                  </div>
                  <div class="col-2"></div>
                </div>
                <div v-for="(device, index) in devices">
                  <div v-if="device.type == 2">
                    <div class="row">
                      <div class="col-1">
                        <input type="checkbox" class="form-check-input" v-model="selectedDevices" :name="device.name" :id="device.name" :value="device.id">
                      </div>
                      <div class="col-4">
                        {{ device.id }}
                      </div>
                      <div class="col-5" v-if="!device.isEdit">
                        {{device.name}}
                      </div>
                      <div class="col-5" v-else>
                        <input type="text" class="form-control-sm" placeholder="Gerätebezeichnung" v-model="devices[index]['name']">
                      </div>
                      <div class="col-2">
                        <i class="bi bi-pencil-square" @click="changeEdit(index)" v-if="!device.isEdit"></i>
                        <i class="bi bi-check-circle" @click="saveDevice(index)" v-if="device.isEdit"></i>
                        <i class="bi bi-x-circle" @click="changeEdit(index)" v-if="device.isEdit"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion" id="accordionWandthermostat">
          <div class="accordion-item">
            <h2 class="accordion-header" id="fenster">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWandthermostat" aria-expanded="true" aria-controls="collapseWandthermostat">
                <strong>Wandthermostate</strong>
              </button>
            </h2>
            <div id="collapseWandthermostat" class="accordion-collapse collapse" aria-labelledby="fenster" data-bs-parent="#accordionWandthermostat">
              <div class="accordion-body">
                <div class="row">
                  <div class="col-1">
                    Zuweisen
                  </div>

                  <div class="col-4">
                    GeräteId
                  </div>
                  <div class="col-5">
                    Bezeichnung
                  </div>
                  <div class="col-2"></div>
                </div>
                <div v-for="(device, index) in devices">
                  <div v-if="device.type == 3">
                    <div class="row">
                      <div class="col-1">
                        <input type="checkbox" class="form-check-input" v-model="selectedDevices" :name="device.name" :id="device.name" :value="device.id">
                      </div>
                      <div class="col-4">
                        {{ device.id }}
                      </div>
                      <div class="col-5" v-if="!device.isEdit">
                        {{device.name}}
                      </div>
                      <div class="col-5" v-else>
                        <input type="text" class="form-control-sm" placeholder="Gerätebezeichnung" v-model="devices[index]['name']">
                      </div>
                      <div class="col-2">
                        <i class="bi bi-pencil-square" @click="changeEdit(index)" v-if="!device.isEdit"></i>
                        <i class="bi bi-check-circle" @click="saveDevice(index)" v-if="device.isEdit"></i>
                        <i class="bi bi-x-circle" @click="changeEdit(index)" v-if="device.isEdit"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

<!--          </div>-->

        <div class="mb-3 mt-3">
          <button :disabled="safeDisabled == 1" @click="createRoom">Speichern</button>
          <router-link to=""><button @click="$router.go(-1)">Abbrechen</button></router-link>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
import Back from "@/components/SingleComponents/Back.vue";
import Navigation from "@/components/Navigation.vue";
import Header from '@/components/Header.vue';
export default {
  components: {Back, Header},
  name: "CreateRoom",
  data() {
    return {
      anlagenId: '',
      description: '',
      name:'',
      safeDisabled: true,
      selectedDevices: [],
      devices: '',
      anlage: ''
    }
  },
  watch: {
    selectedDevices() {
      if (this.name != '') {
        this.safeDisabled = false
      }
    },
    name() {
      if (this.selectedDevices.length > 0 ) {
        this.safeDisabled = false
      }
    }
  },
  methods: {
    fetchAnlage(anlagenId) {
      const token = $cookies.get("token");
      const user = $cookies.get("id");
      fetch('http://localhost:3001/anlagen/' + anlagenId, {
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
              console.log("Anlage", data[0])
              this.anlage = data[0];
              // for (let i = 0; i < data.length; i++) {
              //   this.fetchRooms(data[i]['id'])
              // }

            });
          })
          .catch((err) => {
            console.error(err);
          });
    },

    changeEdit(index){
      this.devices[index]['isEdit'] = !this.devices[index]['isEdit']
    },
    saveDevice(index){
      console.log("save", this.devices[index], this.devices[index]['roomId'])
      this.updateDevice(this.devices[index], this.devices[index]['roomId'] )
      this.changeEdit(index)
    },
    createRoom() {
      const token = $cookies.get("token");

      const data = {"name": this.name, "description": this.description, "anlagenId": this.anlagenId}
      fetch('http://localhost:3001/rooms', {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "x-access-token": token,
          // "X-RapidAPI-Host": 'roomss-by-api-ninjas.p.rapidapi.com',
        },
        body: JSON.stringify(data),
      })
          .then(response => {
            if (response.status == 401) {
              this.$router.push('/')
            }
            response.json().then((data) => {
              let roomId = data['message']
              for (let i = 0; i < this.devices.length; i++) {
                console.log("Created", data['message'], this.devices[i])
                this.updateDevice(this.devices[i], data['message'])
              }
            });
          })
          .catch((err) => {
            console.error(err);
          });
    },
    updateDevice(device, roomId) {
      const token = $cookies.get("token");
      const data = {"name": device.name, "roomId": roomId, "id": device }
      fetch('http://localhost:3001/devices/' + device['id'], {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "x-access-token": token,
          // "X-RapidAPI-Host": 'roomss-by-api-ninjas.p.rapidapi.com',
        },
        body: JSON.stringify(data),
      })
          .then(response => {
            if (response.status == 401) {
              this.$router.push('/')
            }
            response.json().then((data) => {
              data = data[0]

              // this.anlage = data[0]
              // console.log("Updated devices", this.anlage)
              // this.$router.back()
            });
          })
          .catch((err) => {
            console.error(err);
          });
    },
    fetchData() {
      const token = $cookies.get("token");
      // const token = 12345

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
              this.devices = data['devices'];
              for (let i = 0; i < this.devices.length; i++) {
                this.devices[i]['isEdit'] = false;
              }
            });
          })
          .catch((err) => {
            console.error(err);
          });
    },
  },
  mounted() {
    this.anlagenId = this.$route.params.id
    this.fetchAnlage(this.anlagenId)
    this.fetchData()

    console.log("Halol", this.anlage)
  },

}
</script>

<style scoped>
.row {
  line-height: 1.5;
  height: 35px;
}

.bi-check-circle:hover {
  color: var(--accent1);
}
.accordion-button {
  background: var(--secondary)
}


</style>
