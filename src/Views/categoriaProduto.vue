<template>
 <h1>{{ route.params.categoria }}</h1>

<ProdutoCard
  v-for="produto in produtosDaCategoria"
  :key="produto.id"
  :id="produto.id"
  :titulo="produto.titulo"
  :descricao="produto.descricao"
  :imagem="produto.imagem"
  />

</template>
<script setup>
import { listaProdutos } from '@/data/produtos';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import ProdutoCard from '@/components/ProdutoCard.vue';

const route = useRoute();

const produtosDaCategoria = computed(() => {

  return listaProdutos.filter(item => item.categoria === route.params.categoria);
});
</script>
<style scoped>
</style>
