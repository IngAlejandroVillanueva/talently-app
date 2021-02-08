<template>
  <div class="default-layout">
    <Header v-if="$auth.loggedIn" />
    <Nuxt />
  </div>
</template>

<script>
import Header from '@/components/layout/Header'

export default {
  name: 'DefaultLayout',
  components: {
    Header,
  },
}
</script>

<style lang="scss">
.default-layout {
  background-color: #ebf0f6;
  min-height: 100vh;
}
</style>
