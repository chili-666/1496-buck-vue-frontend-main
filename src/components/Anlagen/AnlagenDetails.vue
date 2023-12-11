<template>
  <Header :title="anlage.anlagenName"  :anlage="anlage.id" />
    <div class="um-content px-4">
      <div class="w-100">
        <Rooms :anlagenId=id />
      </div>
    </div>
</template>

<script>
import Rooms from '@/components/Rooms/Rooms.vue';
import Header from "@/components/Header.vue";

export default {
  name: "AnlagenDetail",
  components: {Header, Rooms},
  props: ['title'],
  data() {
    return {
      id: '',
      room:'',
      anlage: ''
    }
  },

  methods: {
    fetchAnlage() {
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
              console.log("TEST", this.anlage.anlagenName)
              // for (let i = 0; i < data.length; i++) {
              //   this.fetchRooms(data[i]['id'])
              // }

            });
          })
          .catch((err) => {
            console.error(err);
          });
    },
  },
  mounted() {
    this.id = this.$route.params.id
    this.fetchAnlage()
    // this.fetchData()
  },
}
</script>

<style scoped>

</style>
