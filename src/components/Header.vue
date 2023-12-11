<template>
  <div class="kopfbereich text-center fixed-top d-flex align-items-between flex-wrap">
    <div class="margin-x-0 row w-100 mt-4 px-4">
<!--      <div class="col-4"><a href=""><img src="bilder/placeholder.jpg" alt="" class="profilbild"></a></div>-->

    </div>
    <div class="w-100 text-center">
      <h1>{{ title }}</h1>
      <div v-if="temp > 0">
        <p class="big mb-5">{{temp.toFixed(1)}}&#176;C</p>
      </div>
      <div v-if="anlage > 0">
        <router-link :to="`/anlagen/details/${anlage}/edit`"><button>Anlage bearbeiten</button></router-link>
      </div>
<!--      <Back />-->
    </div>

  </div>
<Footer />
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
  name: "Header",
  components: {Footer},
  props: ['title', 'temp', 'anlage']
}
</script>

<style scoped>

</style>
