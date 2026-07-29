<template>
  <div id="layout-app">
    <HeaderComponent />
    
    <main class="conteudo-principal">
      <router-view />
    </main>
    
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './views/Header.vue'
import FooterComponent from './views/footer.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
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
