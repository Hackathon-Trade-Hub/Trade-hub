<template>
  <div class="card" style="width: 18rem;">
    <img :src="imagem" class="card-img-top" :alt="titulo">
    <div class="card-body">
      <h5 class="card-title">{{ titulo }}</h5>
      <p class="card-text">{{ descricao }}</p>
      <a href="#" class="btn-primary">Acessar</a>
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

<style scoped>

.card-img-top{
  border-radius: 5px;
}
.card-title{
  color: #0066ff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 4vh;

  }
.card-text{
  color: #555555;
  font-weight: 500;
  font-size: 17px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
}
.btn-primary{
  background-color:#0066ff;
  text-decoration: none;
  color: #ffffff;
  padding: 5px;
  border-radius: 3px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.15rem;
}
</style>
