<template>
  <section class="pagina">
    <h1>Usuários</h1>

    <p v-if="carregando">Carregando...</p>
    <p v-else-if="erro" class="erro">{{ erro }}</p>
    <p v-else-if="lista.length === 0">Nenhum usuário cadastrado.</p>

    <ul v-else class="lista">
      <li v-for="usuario in lista" :key="usuario.id">
        <img :src="usuario.foto" :alt="usuario.nome" />
        <div>
          <strong>{{ usuario.nome }}</strong>
          <span>{{ usuario.email }}</span>
        </div>
        <RouterLink :to="`/usuarios/${usuario.id}`">Ver</RouterLink>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { carregarUsuarios } from '@/data/auth.js'

const lista = ref([])
const carregando = ref(true)
const erro = ref('')

onMounted(async () => {
  try {
    lista.value = await carregarUsuarios()
  } catch (e) {
    erro.value = e.message
  } finally {
    carregando.value = false
  }
})
</script>

<style scoped>
.pagina {
  max-width: 700px;
  margin: 60px auto;
  padding: 0 16px;
}

.lista {
  padding: 0;
  list-style: none;
}

.lista li {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  margin-bottom: 10px;
  background: #ffffff;
  border: 1px solid #dbe5f3;
  border-radius: 10px;
}

.lista img {
  width: 52px;
  height: 52px;
  object-fit: cover;
  border-radius: 50%;
}

.lista div {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.lista a {
  color: #185aee;
  font-weight: 700;
}

.erro {
  color: #a61b1b;
}
</style>
