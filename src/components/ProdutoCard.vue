<template>
  <div class="card">
    <div class="caixa-imagem">
      <img :src="imagem" class="card-img-top" :alt="titulo">
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ titulo }}</h5>
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
.card{
  width: 18rem;
  border: 2px solid #0066ff !important;
  margin: 10px;
}
.caixa-imagem{
  width: 16vw;
  height: 16vw;

}
.card-img-top{
  border-radius: 5px;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.card-title{
  color: #0066ff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 4vh;

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
