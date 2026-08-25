<template>
  <div class="home-page">
    <main class="conteudo-principal">

      <section class="container my-5 lista-produtos">
          <div class="produtos">

            <ProdutoCard v-for="produto in listaProdutos" :key="produto.id" :id="produto.id" :titulo="produto.titulo"
            :descricao="produto.descricao" :imagem="produto.imagem" :preco="produto.preco"></ProdutoCard>

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

.pagina-inicial {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.conteudo {
  flex: 1;
}

.banner {
  background: #3b7fff;
  width: 100%;
  padding: 0 0 110px 0;
  position: relative;
  text-align: center;
  color: #ffffff;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.banner h1 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 15px;
  letter-spacing: -0.5px;
  color: #ffffff;
}

.banner p {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
  color: #ffffff;
}

.texto-banner {
  max-width: 800px;
  margin: 60px auto 0 auto;
  padding: 0 20px;
}

.degrade {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background: linear-gradient(to bottom,
      rgba(59, 127, 255, 0) 0%,
      #ffffff 100%);
  pointer-events: none;
}

.produtos {
  padding: 10vw 0 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.lista-produtos {
  position: relative;
  z-index: 5;
  margin-top: -50px !important;
}

.imagem-produto {
  height: 180px;
  object-fit: cover;
}
</style>
