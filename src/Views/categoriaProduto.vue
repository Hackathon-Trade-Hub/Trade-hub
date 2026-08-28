<template>
 <h1>{{ route.params.categoria }}</h1>
<div class="produtos">
  <ProdutoCard
  v-for="produto in produtosDaCategoria"
  :key="produto.id"
  :id="produto.id"
  :titulo="produto.titulo"
  :descricao="produto.descricao"
  :imagem="produto.imagem"
  />
</div>

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
h1{
  font-family: sans-serif;
  margin: 2vw 0 0 10vw;
  font-weight: 500;
  font-size: 1.75rem;
}
.produtos{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto 6vw auto;
  justify-items: center;
}
</style>
