<template>
  <div class="card" style="width: 18rem;">
    <img :src="imagem" class="card-img-top" :alt="titulo">
    <div class="card-body">
      <h5 class="card-title">{{ titulo }}</h5>
      <p class="card-text">{{ descricao }}</p>
      <a href="#" class="btn btn-primary">Acessar</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProdutoCard',
  props: {
    titulo: String,
    descricao: String,
    imagem: String
  }
}
</script>

<style scoped></style>
