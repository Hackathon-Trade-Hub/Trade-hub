<template>
  <div id="layout-app">
    <HeaderComponent
      v-if="!['paginaProduto', 'carrinho', 'perfilVendedor', 'propostaTroca', 'chat'].includes($route.name)" />

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
  background-color: #ffffff;
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
