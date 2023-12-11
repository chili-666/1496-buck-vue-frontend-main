<template>
  <Header :title="anlage.anlagenName"  :anlage="0" />
    <div class="um-content px-4 mb-5">
    <div class="w-100">
      <div class="row">
        <div class="col-10">
      <div class="d-flex flex-row flex-wrap justify-content-between align-content-between mb-2">
        <div>
          <h2 class="d-flex flex-row flex-wrap pb-3">
            <span class="me-2" v-if="!anlage.isEdit">
              {{anlage.anlagenName}}
            </span>
            <span class="me-2" v-else>
              <input v-model="anlage.anlagenName" type="text" class="form-control-sm">
            </span>
            <div class="col-1">
              <i class="bi bi-pencil-square" @click="changeEditAnlage(index)" v-if="!anlage.isEdit"></i>
              <i class="bi bi-x-circle" @click="changeEditAnlage(index)" v-if="anlage.isEdit"></i>
            </div>
          </h2>
        </div>
      </div>
        </div>
        <div class="col-2">
          <button @click="saveAnlage">Speichern</button>
          <router-link :to="'/anlagen/details/' + id"><button class="mt-1">Abbrechen</button></router-link>
        </div>
      </div>
      <div class="d-flex flex-row flex-wrap">
        <div class="col-8 me-2">
          <span v-if="!anlage.isEdit">
              {{anlage.description}}
          </span>
          <span v-else>
            <textarea v-model="anlage.description" type="text" class="form-control-sm" cols="70" rows="2"></textarea>
          </span>
        </div>
        <div>
          <i class="bi bi-pencil-square" @click="changeEditAnlage(index)" v-if="!anlage.isEdit"></i>
          <i class="bi bi-x-circle" @click="changeEditAnlage(index)" v-if="anlage.isEdit"></i>
        </div>
      </div>
<!--      <div class="accordion mt-5" id="accordionUnassigned">-->
<!--        <div class="accordion-item">-->
<!--          <h2 class="accordion-header" id="unassigned">-->
<!--            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseUnassigned" aria-expanded="true" aria-controls="collapseUnassigned">-->
<!--              <strong>Verfügbare Geräte</strong>-->
<!--            </button>-->
<!--          </h2>-->
<!--          <div id="collapseUnassigned" class="accordion-collapse show" aria-labelledby="unassigned" data-bs-parent="#accordionUnassigned">-->
<!--            <div class="accordion-body">-->
<!--              <div class="row">-->
<!--                <div class="col-1">-->
<!--                 <small>Zugewiesen</small>-->
<!--                </div>-->

<!--                <div class="col-4 ms-1">-->
<!--                 <small>GeräteId</small>-->
<!--                </div>-->
<!--                <div class="col-4">-->
<!--                  <small>Bezeichnung</small>-->
<!--                </div>-->
<!--                <div class="col-1"></div>-->
<!--              </div>-->
<!--              <div v-for="(device, index) in devices">-->
<!--                  <div class="row" v-if="device.anlagenId == null">-->
<!--                    <div class="col-1">-->

<!--                      <div class="col-12 form-check-reverse form-switch mb-4">-->

<!--                        <input v-model="devices[index]['isAssigned']" class="form-check-input" type="checkbox" role="switch" id="device.id">-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="col-4 ms-1">-->
<!--                      {{ device.deviceId }}-->
<!--                    </div>-->
<!--                    <div class="col-4" v-if="!device.isEdit">-->
<!--                      {{device.name}}-->
<!--                    </div>-->
<!--                    <div class="col-4" v-else>-->
<!--                      <input v-model="devices[index].name" type="text" class="form-control-sm" placeholder="Gerätebezeichnung">-->
<!--                    </div>-->
<!--                    <div class="col-1">-->
<!--                      <i class="bi bi-pencil-square" @click="changeEdit(index)" v-if="!device.isEdit"></i>-->
<!--                      <i class="bi bi-check-circle" @click="saveDevice(index)" v-if="device.isEdit"></i>-->
<!--                      <i class="bi bi-x-circle" @click="changeEdit(index)" v-if="device.isEdit"></i>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->

<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <div class="accordion mt-5" id="accordionAssigned">
        <div class="accordion-item">
          <h2 class="accordion-header" id="assigned">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAssigned" aria-expanded="true" aria-controls="collapseAssigned">
              <strong>Geräte</strong>
            </button>
          </h2>
          <div id="collapseAssigned" class="accordion-collapse show" aria-labelledby="assigned" data-bs-parent="#accordionAssigned">
            <div class="accordion-body">
              <div class="row">
                <div class="col-1">
                  <small>Zugewiesen</small>
                </div>

                <div class="col-4 ms-1">
                  <small>GeräteId</small>
                </div>
                <div class="col-4">
                  <small>Bezeichnung</small>
                </div>
                <div class="col-1"></div>
              </div>
              <div v-for="(device, index) in devices">
                <div class="row">
                  <div class="col-1">

                    <div class="col-12 form-check-reverse form-switch mb-4">

                      <input v-model="devices[index]['isAssigned']" class="form-check-input" type="checkbox" role="switch" id="device.id">
                    </div>
                  </div>
                  <div class="col-4 ms-1">
                    {{ device.deviceId }}
                  </div>
                  <div class="col-4" v-if="!device.isEdit">
                    {{device.name}}
                  </div>
                  <div class="col-4" v-else>
                    <input v-model="devices[index].name" type="text" class="form-control-sm" placeholder="Gerätebezeichnung">
                  </div>
                  <div class="col-1">
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
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Warning from '@/components/SingleComponents/Warning.vue';

import Anlage from "@/components/Anlagen/Anlage.vue";
export default {
  name: "EditAnlage",
  components: {Header, Warning},
  props: ['id'],
  data() {
    return {
      anlage: [],
      devices: [],
      showWarning: false,
      showWarningAdd: false,
      changingGateway: '',
      assigned: []
    }
  },
  methods: {
    saveAnlage() {
      let saveDevices = []
      for (let i = 0; i < this.devices.length; i++) {
        if (this.devices[i]['isAssigned'] == true) {
          this.devices[i]['anlagenId'] = this.id
          // this.devices[i]['roomId'] = "0"
        } else {
          this.devices[i]['anlagenId'] = 0
        }
        saveDevices.push(this.devices[i])

      }
      console.log("SAVING", saveDevices)
      for (let i = 0; i < saveDevices.length; i++) {
        this.updateDevice(saveDevices[i])
      }
      this.updateAnlage(this.anlage)
      this.devices = []
      this.getUnassignedDevices()
      this.getAssignedDevices()
      this.getAnlage()
    },
    updateDevice(device) {
      const token = $cookies.get("token");
      const data = {'name': device.name, "room": device.roomId, "anlagenId": device.anlagenId}
      // console.log("Devices", data)
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
    updateAnlage(anlage) {
      const token = $cookies.get("token");
      const data = {'name': anlage.anlagenName, "description":anlage.description, "anlagenId": anlage.anlagenId, "id": anlage.id}
      // console.log("updating anlage", data, anlage)
      fetch('http://localhost:3001/anlagen/', {
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
    changeEdit(index) {
      console.log("EDIT", this.devices[index])

      // this.devices[index]['name'] = ''
      // if (this.devices[index]['isEdit'])
      this.devices[index]['isEdit'] = !this.devices[index]['isEdit']
    },
    changeEditAnlage(index) {
      console.log("EDIT", this.devices[index])

      // this.devices[index]['name'] = ''
      // if (this.devices[index]['isEdit'])
      this.anlage['isEdit'] = !this.anlage['isEdit']
    },
    getAnlage() {

      const token = $cookies.get("token");
      const user = $cookies.get("id");
      fetch('http://localhost:3001/anlagen/' + this.id , {
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

              data  = data[0];
              this.anlage = data;
              this.anlage['isEdit'] = false
            });
          })
          .catch((err) => {
            console.error(err);
          });
    },
    getUnassignedDevices() {
      // this.loaded = false
      const token = $cookies.get("token");
      fetch('http://localhost:3001/devices/anlage/unassigned', {
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
              data = data.devices
              console.log("Unassigned", data)
              for (let i = 0; i < data.length; i++) {

                data[i]['isAssigned'] = false;
                this.devices.push(data[i])
              }

            });
          })
          .catch((err) => {
            console.error(err);
          });
    },
    getAssignedDevices() {
      // this.loaded = false
      const token = $cookies.get("token");
      fetch('http://localhost:3001/devices/anlage/' + this.id, {
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
              console.log("Assigned", data)
              data = data.devices
              for (let i = 0; i < data.length; i++) {
                data[i]['isAssigned'] = true;
                this.devices.push(data[i])
              }


            });
          })
          .catch((err) => {
            console.error(err);
          });
    },
  },
  mounted() {
    this.getAnlage()
    this.getUnassignedDevices()
    this.getAssignedDevices()
  }
}
</script>

<style scoped>

</style>
