<template>
  <div class="card">
    <div class="card-img-title">
      <div class="caixa-imagem"><img :src="imagem" class="card-img-top" :alt="titulo"></div>
      <h5 class="card-title">{{ titulo }}</h5>
    </div>

    <a href="#" class="botao">Acessar</a>
  </div>

</template>

<script>
import { adicionarAoCarrinho } from '../Views/carrinho.vue'
export default {
  name: 'ProdutoCard',
  props: {  
    id: [String, Number],
    titulo: String,
    descricao: String,
    imagem: String,
    preco: [String, Number]
  },
  methods: {
    handleAdicionarAoCarrinho() {
      adicionarAoCarrinho({
        id: this.id,
        titulo: this.titulo,
        imagem: this.imagem,
        preco: this.preco
      })
    }
  }
}
</script>

<style scoped>
.card {
  width: 18rem;
  border: 2px solid #0066ff !important;
  margin: 10px;
  border-radius: 30px !important;
  padding: 30px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.caixa-imagem {
  width: 16vw;
  height: 16vw;
  margin-left: auto;
  margin-right: auto;
}

.card-img-top {
  border-radius: 5px;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-title {
  color: #0066ff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 4vh;

}

.botao {
  background-color: #0066ff;
  text-decoration: none;
  color: #ffffff;
  padding: 5px 20px;
  border-radius: 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.15rem;
  font-weight: 500;
  margin-left: 0;
}
</style>
