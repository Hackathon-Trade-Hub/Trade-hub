<template>
  <div class="home-page">
    <main class="conteudo-principal">
        <section class="hero-section">


        <div class="hero-content">
          <h1>O que gostaria de trocar hoje?</h1>
          <p>O maior site de troca e venda do Brasil.</p>
        </div>

        <div class="white-gradient-fade"></div>
      </section>

      <section class="container my-5 produtos-container-wrapper">

        <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">


            <ProdutoCard
              v-for="produto in listaProdutos"
              :key="produto.id"
              :id="produto.id"
              :titulo="produto.titulo"
              :descricao="produto.descricao"
              :imagem="produto.imagem"
            />



        </div>
      </section>
    </main>
  </div>
</template>

<script setup>

  import ProdutoCard from '@/components/ProdutoCard.vue';

  import { listaProdutos } from '@/data/produtos';


</script>

<style scoped>
@import "bootstrap/dist/css/bootstrap.css";

.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.conteudo-principal {
  flex: 1;
}

.hero-section {
  background: #3b7fff;
  width: 100%;
  padding: 0 0 110px 0;
  position: relative;
  text-align: center;
  color: #ffffff;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.hero-header {
  max-width: 1200px;
  margin: 0 auto;
  padding: 25px 20px;
}

.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-nav a {
  color: #ffffff !important;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  opacity: 0.95;
  transition: opacity 0.2s;
}

.header-nav a:hover {
  opacity: 1;

}

.nav-links {
  display: flex;
  gap: 40px;
}

.arrow-down {
  font-size: 12px;
  margin-left: 2px;
}

.cart-icon a {
  font-size: 22px;
}

.hero-content {
  max-width: 800px;
  margin: 60px auto 0 auto;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 15px;
  letter-spacing: -0.5px;
  color: #ffffff;
}

.hero-content p {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
  color: #ffffff;
}

.white-gradient-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background: linear-gradient(to bottom, rgba(59, 127, 255, 0) 0%, #ffffff 100%);
  pointer-events: none;
}

.produtos-container-wrapper {
  position: relative;
  z-index: 5;
  margin-top: -50px !important;
}

.card-img-top {
  height: 180px;
  object-fit: cover;
}
</style>
