<template>
  <div class="produto-card">

    <div class="produto-img">
      <img :src="imagem" class="img-top" :alt="titulo" />
    </div>

    <div class="produto-title">
      <h5 class="card-title">{{ titulo }}</h5>

      <RouterLink :to="{ name: 'paginaProduto', params: { id } }" class="botao">
        Acessar
      </RouterLink>

    </div>
  </div>
</template>

<script>
import { adicionarAoCarrinho } from '@/data/carrinho'
export default {
  name: 'ProdutoCard',
  props: {
    id: [String, Number],
    titulo: String,
    descricao: String,
    imagem: String,
    preco: [String, Number],
  },
  methods: {
    handleAdicionarAoCarrinho() {
      adicionarAoCarrinho({
        id: this.id,
        titulo: this.titulo,
        imagem: this.imagem,
        preco: this.preco,
      })
    },
  },
}
</script>

<style scoped>
.produto-card {
  width: 30vh;
  height: 60vh;

  margin: 10px;

  border: 2px solid #0066ff ;
  border-radius: 30px ;

  overflow: hidden;

  display: flex;
  flex-direction: column;

  background: #ffffff;
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

.card-title {
  margin: 0;

  font-size: 1.1rem;
  font-weight: 700;

  line-height: 1.25;
  text-align: left;

  color: #ffffff;
}

.botao {
  width: 100%;

  align-self: center;

  padding: 6px 10px;

  border-radius: 6px;

  background-color: #ffffff;
  color: #000000;

  text-decoration: none;

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.15rem;
  font-weight: 500;
  margin-top: 10px;
}
</style>
