<template>
  <section class="pagina">
    <p v-if="carregando">Carregando...</p>
    <p v-else-if="erro" class="erro">{{ erro }}</p>

    <div v-else class="cartao">
      <img :src="usuario.foto" :alt="usuario.nome" />
      <h1>{{ usuario.nome }}</h1>
      <p>E-mail: {{ usuario.email }}</p>
      <p>Telefone: {{ usuario.telefone }}</p>
    </div>

    <RouterLink to="/usuarios">Voltar</RouterLink>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { consultarUsuario } from '@/data/auth.js'

const route = useRoute()
const usuario = ref(null)
const carregando = ref(true)
const erro = ref('')

onMounted(async () => {
  try {
    usuario.value = await consultarUsuario(route.params.id)
  } catch (e) {
    erro.value = e.message
  } finally {
    carregando.value = false
  }
})
</script>

<style scoped>
.pagina {
  max-width: 500px;
  margin: 60px auto;
  padding: 0 16px;
  text-align: center;
}

.cartao {
  padding: 24px;
  margin-bottom: 16px;
  background: #ffffff;
  border: 1px solid #dbe5f3;
  border-radius: 12px;
}

.cartao img {
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 50%;
}

.erro {
  color: #a61b1b;
}
</style>
