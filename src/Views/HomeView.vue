<template>
  <div class="home-page">
    <main class="conteudo-principal">

      <section class="container my-5 lista-produtos">
          <div class="categorias" :class="{ 'busca-ativa': buscaAtiva }">

            <div
            v-for="(produtos, categoria) in produtosPorCategoria"
            :key="categoria"
            class="categoria"
            >
              <div class="categoria-cabecalho">
                <h2>{{ buscaAtiva ? tituloBusca : categoria }}</h2>
                <span v-if="!buscaAtiva" class="categoria-link" aria-hidden="true">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h13M13 6l6 6-6 6" />
                  </svg>
                </span>
                <span v-else class="contador-resultados">
                  {{ produtos.length }} {{ produtos.length === 1 ? 'produto' : 'produtos' }}
                </span>
              </div>

              <div v-if="produtos.length" class="produtos">
              <ProdutoCard
                v-for="produto in produtos"
                :key="produto.id"
                :id="produto.id"
                :titulo="produto.titulo"
                :descricao="produto.descricao"
                :imagem="produto.imagem"
                :preco="produto.preco"
                :status="produto.status"
              />
            </div>
            <p v-else class="sem-resultados">Nenhum produto encontrado para essa busca.</p>
            </div>
          </div>
   </section>
    </main>
  </div>
</template>

<script setup>

import { computed } from 'vue';
import ProdutoCard from '@/components/ProdutoCard.vue';

import { produtosFiltrados, termoBusca } from '@/components/Filter.vue';

const buscaAtiva = computed(() => termoBusca.value.trim().length > 0);
const tituloBusca = computed(() => `Resultados para “${termoBusca.value.trim()}”`);

const produtosPorCategoria = computed(() => {
  if (buscaAtiva.value) {
    return { busca: produtosFiltrados.value };
  }

  const categorias = {};

  for (const produto of produtosFiltrados.value) {
    if (!categorias[produto.categoria]) {
      categorias[produto.categoria] = [];
    }
    categorias[produto.categoria].push(produto);
  }
  return categorias;
});
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
  padding: 24px 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.busca-ativa .produtos {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: flex-start;
  gap: 20px;
}

.busca-ativa .produtos :deep(.produto-card) {
  margin: 0;
}

.categoria-cabecalho {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}

.categoria-cabecalho h2 {
  margin: 0;
  font-family: sans-serif;
  font-weight: 500;
  font-size: 1.75rem;
}

.contador-resultados {
  padding: 5px 10px;
  color: #185aee;
  background: #edf4ff;
  border-radius: 999px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
}

.sem-resultados {
  margin: 24px 0 0;
  padding: 28px;
  color: #63748a;
  background: #f8faff;
  border: 1px solid #dbe5f3;
  border-radius: 12px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
}

.categoria-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: #0066ff;
  transition: transform 0.2s ease;
}

.categoria-link svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.lista-produtos {
  position: relative;
  z-index: 5;
  margin-top: 0 !important;
}

.imagem-produto {
  height: 180px;
  object-fit: cover;
}

@media (max-width: 640px) {
  .busca-ativa .produtos {
    justify-content: center;
  }

  .categoria-cabecalho {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
