<template>
  <div class="home">
    <LoginView />
  </div>
</template>

<script>
// @ is an alias to /src

import LoginView from '@/components/Login.vue'

export default {
  name: 'HomeView',
  components: {
    LoginView
  }
}
</script>
