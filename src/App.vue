<template>
  <div id="layout-app">
    <HeaderComponent v-if="$route.name !== 'carrinho'" />

    <main class="conteudo-principal">
      <router-view />
    </main>

    <FooterComponent />
  </div>
</template>

<script setup>
import HeaderComponent from './components/Header.vue'
import FooterComponent from './components/Footer.vue'


</script>

<style>
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