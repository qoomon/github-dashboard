<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {onBeforeMount} from "vue";

onBeforeMount(async () => {
  const user = await fetch('/api/login/status')
      .then(response => {
        if (response.status !== 200) {
          return null
        }
        return response.json()
      })

  if (!user) {
    console.log('User not logged in')
    window.location.href = '/login'
  }
})
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </header>

  <RouterView/>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav > * {
  margin: 0 1rem;
}

</style>
