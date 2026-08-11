<template>
  <h1>
    Preencha com as informações do produto
  </h1>

  <form @submit.prevent="enviarProduto">

    <label>
      Você quer
      <input
        type="radio"
        name="venderTrocar"
        value="vender"
        v-model="tipo"
      >
      vender

      ou

      <input
        type="radio"
        name="venderTrocar"
        value="trocar"
        v-model="tipo"
      >
      trocar?
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

    <br>


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

<style>

</style>
