<template>
  <h1 class="page-title">
    Preencha com as informações do produto
  </h1>

  <form @submit.prevent="enviarProduto">

    <span>Você quer</span>

<label class="opcao">
  <input
    type="radio"
    name="venderTrocar"
    value="vender"
    v-model="tipo"
  >
  <span class="radio-custom"></span>
Vender

</label>


<label class="opcao">
<input
    type="radio"
    name="venderTrocar"
    value="trocar"
    v-model="tipo"
  >
  <span class="radio-custom"></span>
Trocar?
</label>

    <br><br>

    <label for="imagem">
      Imagem do produto:
    </label>

    <input
      id="imagem"
      type="file"
      accept="image/*"
      @change="selecionarImagem"
    >


    <div v-if="preview">
      <p>Pré-visualização:</p>

      <img
        :src="preview"
        alt="Pré-visualização do produto"
        width="200"
      >
    </div>
    <div class="desc">
      <label for="descricao">
        Descrição do Produto:
        <br>

        <textarea name="descricao" id="descricao"></textarea>


      </label>
      </div>

    <br>
<!-- SIX SEVEN -->

    <button type="submit">
      Cadastrar produto
    </button>

  </form>
</template>

<script setup>
import { ref } from 'vue'

const tipo = ref('')
const imagem = ref(null)
const preview = ref(null)

function selecionarImagem(event) {
  imagem.value = event.target.files[0]

  if (imagem.value) {
    preview.value = URL.createObjectURL(imagem.value)
  }
}

function enviarProduto() {
  console.log('Tipo:', tipo.value)
  console.log('Imagem:', imagem.value)
}
</script>

<style scoped>
.page-title{
  font-size: 2.5rem;
  text-align: center;
  color: #1067f3;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

}









.opcao {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
  margin: 10px;
}

/* Esconde o radio original */
.opcao input[type="radio"] {
  display: none;
}

/* Círculo externo */
.radio-custom {
  width: 18px;
  height: 18px;
  border: 2px solid #94a3b8;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  transition: all 0.2s;
}

/* Quando marcado */
.opcao input[type="radio"]:checked + .radio-custom {
  border-color: #3b82f6;
  background-color: #3b82f6;
}

/* Bolinha interna */
.opcao input[type="radio"]:checked + .radio-custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

/* Hover */
.opcao:hover .radio-custom {
  border-color: #3b82f6;
}

</style>
