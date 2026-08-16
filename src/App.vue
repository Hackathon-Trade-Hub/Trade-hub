<template>
  <div id="layout-app">
    <HeaderComponent v-if="route.path !== '/carrinho'" />

    <main class="conteudo-principal">
      <router-view />
    </main>

    <FooterComponent />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import HeaderComponent from './components/Header.vue'
import FooterComponent from './components/Footer.vue'

const route = useRoute()


</script>

<style scoped>
body {
  margin: 0;
  background-color: #f5f5f5;
}
#layout-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.conteudo-principal {
  flex: 1;
}
</style>
