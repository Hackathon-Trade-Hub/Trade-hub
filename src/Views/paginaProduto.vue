<template>
  <div class="detalhes">
    <!-- Exibe APENAS se o produto foi encontrado -->
    <div v-if="produto">
      <h1>{{ produto.nome }}</h1>
      <p class="preco">{{ produto.preco }}</p>
      <p class="descricao">{{ produto.descricao }}</p>

      <router-link to="/">Voltar para a Home</router-link>
    </div>

    <div v-else>
      <p>Produto não encontrado.</p>
      <router-link to="/">Voltar para a Home</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { listaProdutos } from '@/data/produtos';
const route = useRoute();

// 1. Pega o ID que veio do clique na Home (ex: '2')
const idDaUrl = Number(route.params.id);

// 2. Procura no array produtos.js APENAS o produto que tem o ID igual ao da URL
const produto = computed(() => {
  return listaProdutos.find(item => item.id === idDaUrl);
});
</script>
