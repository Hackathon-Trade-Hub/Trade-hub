<template>
  <div class="home-page">
    <main class="conteudo-principal">

      <section class="secao-produtos lista-produtos">
        <div class="categoria-cabecalho" v-if="buscaAtiva">
          <h2>{{ tituloBusca }}</h2>
          <span class="contador-resultados">
            {{ produtosExibidos.length }} {{ produtosExibidos.length === 1 ? 'produto' : 'produtos' }}
          </span>
        </div>

        <div v-if="produtosExibidos.length" class="produtos">
          <ProdutoCard
            v-for="produto in produtosExibidos"
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
      </section>
    </main>
  </div>
</template>

<script setup>

import { computed, ref } from 'vue';
import ProdutoCard from '@/components/ProdutoCard.vue';
import { produtosFiltrados, termoBusca } from '@/components/Filter.vue';

const buscaAtiva = computed(() => termoBusca.value.trim().length > 0);
const tituloBusca = computed(() => `Resultados para “${termoBusca.value.trim()}”`);
const ordemAleatoria = ref(embaralhar(produtosFiltrados.value));

function embaralhar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

const produtosExibidos = computed(() => {
  if (buscaAtiva.value) {
    return produtosFiltrados.value;
  }
  return ordemAleatoria.value;
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

.produtos {
  padding: 24px 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.categoria-cabecalho {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 10px;
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

.secao-produtos {
  width: 100%;
  padding-left: 60px;
  padding-right: 60px;
  margin-top: 48px;
  margin-bottom: 48px;
  margin-left: auto;
  margin-right: auto;
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
  .categoria-cabecalho {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>