<template>
  <RouterLink :to="{ name: 'paginaProduto', params: { id } }" class="produto-card">

    <div class="produto-img">
      <img :src="imagem" class="img-top" :alt="titulo" />
    </div>

    <div class="produto-title">
      <h5 class="card-title">{{ titulo }}</h5>
      <p v-if="status" class="card-status">{{ status }}</p>
      <p v-if="preco" class="card-price">{{ preco }}</p>
    </div>

  </RouterLink>
</template>

<script>
export default {
  name: 'ProdutoCard',
  props: {
    id: [String, Number],
    titulo: String,
    descricao: String,
    imagem: String,
    preco: [String, Number],
    status: String,
  },
}
</script>

<style scoped>
.produto-card {
  width: 30vh;
  height: 60vh;

  margin: 10px;

  border: 2px solid #0066ff;
  border-radius: 20px;

  overflow: hidden;

  display: flex;
  flex-direction: column;

  background: #ffffff;

  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.produto-img {
  width: 100%;
  height: 45%;

  background-color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10px;
  box-sizing: border-box;
}

.img-top {
  width: 100%;
  height: 100%;

  object-fit: contain;
}

.produto-title {
  width: 100%;
  height: 55%;

  box-sizing: border-box;

  background-color: #0758f5;
  color: #ffffff;

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  padding: 12px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.produto-title:hover {
  text-decoration: underline;
}

.card-title {
  margin: 0;

  font-size: 1.1rem;
  font-weight: 700;

  line-height: 1.25;
  text-align: left;

  color: #ffffff;
}

.card-status {
  width: fit-content;
  margin: 0;
  padding: 4px 9px;
  color: #0758f5;
  background: #fff;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.card-price {
  margin: 0;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
}
</style>