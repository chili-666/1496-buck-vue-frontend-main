<template>
  <div class="warning-background">
    <div class="warning">
      <h1>Vorsicht!</h1>
      <h3>Hiermit wird folgendes Gateway aus der Anlage entfernt:</h3>
      <div class="danger">
        <div class="row">
          <div class="col-6">
            GeräteId
          </div>
          <div class="col-6">
            Bezeichnung
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <strong>{{ gateway.deviceId }}</strong>
          </div>
          <div class="col-6">
            <strong>{{ gateway.name }}</strong>
          </div>
        </div>
      </div>
      <p class="mt-5 mb-5">
        <strong>
          Gleichzeitig werden folgende Geräte aus der Anlage entfernt und die Zuordnung zu den einzelnen Räumen gelöscht:
        </strong>
      </p>
      <div class="container">
        <div class="row">
          <div class="col-4">
            GeräteId
          </div>
          <div class="col-4">
            Bezeichnung
          </div>
          <div class="col-4">
            Gerätetyp
          </div>
        </div>
          <div v-for="device in devices">
            <div class="row">
              <div class="col-4">
                {{device.deviceId }}
              </div>
              <div class="col-4">
                {{ device.name }}
              </div>
              <div class="col-4">
                {{ device.typename }}
              </div>
            </div>
          </div>
      </div>
      <div class="mt-5">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <div class="form-check form-switch mb-4">
            <input v-model="confirm" class="form-check-input" type="checkbox" role="switch" id="device.id">
            <label>
            Ich möchte das Gateway und allezugehörigen Geräte aus dieser Anlage entfernen.
            </label>
          </div>
        </div>
      </div>
      <div class="d-flex flex-row justify-content-between align-items-center">
        <button class="btn btn-link delete" :disabled="!confirm" @click="clickConfirm">Speichern</button>
        <button class="btn btn-link"  @click="clickCancel">Abbrechen</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Warning",
  props: ['gateway'],
  data() {
    return {
      devices: '',
      confirm: false
    }
  },
  methods: {
    clickConfirm() {
      console.log("Clicked", this.gateway.id)
      this.$emit('clicked', {'status': 'confirm', 'gateway':this.gateway.id});
    },
    clickCancel() {
      console.log("Clicked Cancel")
      this.$emit('clicked', {'status': 'cancel', 'gateway':this.gateway.id});
    },
    getDevices(id) {
      const token = $cookies.get("token");
      fetch('http://localhost:3001/devices/' + id + '/gateway',{
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
              this.devices = data
            });
          })
          .catch((err) => {
            console.error(err);
          });
    }
  },
  mounted() {
    this.getDevices(this.gateway.id)
  }
}
</script>

<style scoped>
.warning-background {
  z-index: 1000;
  background:RGBA(0,0,0,.7);
  position: fixed;
  overflow-y: scroll;
  /*position: absolute;*/
  top:0;
  left: 0;
  width:100%;
  height: 100%;
}

h1 {
  color:red;
  font-weight: bolder;
}

.warning {
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

.danger {
  border: 1px solid var(--bs-warning);
  border-radius: 5px;
  padding: 1em;
  background: var(--bs-warning);
}

.delete {
  color: var(--bs-danger);
  border: 1px solid var(--bs-danger);
  background: var(--bs-danger);
  color: #fff;
}

.delete:disabled {
  color: var(--bs-danger);
  border: 1px solid var(--bs-danger);
  background:transparent;
}
</style>
