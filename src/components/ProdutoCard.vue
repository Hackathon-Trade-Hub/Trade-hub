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
  border: 2px solid #0066ff ;
  margin: 10px;
  border-radius: 30px ;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
}

.produto-imagem {
  height: 33vh;
  background-color: #ffffff;
  margin-left: auto;
  margin-right: auto;
}

.img-top {
  border-radius: 50px;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.produto-title {
  background-color: #0155fd;
  color: #0066ff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 4vh;
  text-align: center;
  padding: 10px 0;
}

.botao {
  text-decoration: none;
  color: #000000;
  padding: 5px 20px;
  border-radius: 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.15rem;
  font-weight: 500;
  background-color: #ffffff;
  margin-bottom: 
}
</style>
