<template>
<div>
  <a href="" @click="$router.go(-1)"><i class="bi bi-arrow-left-square"></i></a>
</div>
</template>

<script>
export default {
  name: "Back",
  props: {
    name: {
      type: String,
      default: ""
    }
  },
}
</script>

<style scoped>

</style>
