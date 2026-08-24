<template>
  <div class="pagina-auth">
    <h1>Cadastrar<span class="azul">-se</span></h1>

    <form @submit.prevent="cadastrar">
      <div class="campo">
        <label>USUÁRIO:</label>
        <input type="text" v-model="usuario" placeholder="Usuário...">
      </div>

      <div class="campo">
        <label>EMAIL:</label>
        <input type="email" v-model="email" placeholder="Email...">
      </div>

      <div class="campo">
        <label>SENHA:</label>
        <input type="password" v-model="senha" placeholder="Senha...">
      </div>

      <button type="button" class="btn-google">Login com o Google</button>

      <div class="botoes">
        <button type="submit" class="btn-salvar">SALVAR</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usuarioCadastrado } from '@/data/usuario.js'

const usuario = ref('')
const email = ref('')
const senha = ref('')
const router = useRouter()

function cadastrar() {
  usuarioCadastrado.usuario = usuario.value
  usuarioCadastrado.email = email.value
  usuarioCadastrado.senha = senha.value

  alert('Cadastro realizado com sucesso!')
  router.push('/entrar')
}
</script>

<style scoped>
.pagina-auth {
  max-width: 720px;
  margin: 0 auto;
  padding: 50px 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}
h1 {
  font-size: 2.1rem;
  letter-spacing: 8px;
  font-weight: 700;
  margin-bottom: 55px;
}
.azul {
  color: #0066ff;
}
.campo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 35px;
}
.campo label {
  width: 110px;
  text-align: center;
  font-weight: 600;
  font-size: 0.8rem;
  margin-bottom: 8px;
}
.campo input {
  flex: 1;
  max-width: 380px;
  padding: 6px 10px;
  border: 1px solid #333;
  border-radius: 4px;
  font-size: 0.8rem;
}
.btn-google {
  display: block;
  margin: 0 auto 35px;
  padding: 6px 16px;
  border: 1px solid #333;
  border-radius: 4px;
  background: #fff;
  font-size: 0.8rem;
  cursor: pointer;
}
.botoes {
  display: flex;
  justify-content: center;
}
.btn-salvar {
  min-width: 110px;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  background: #0066ff;
  color: #fff;
  font-weight: bold;
  font-size: 0.8rem;
  cursor: pointer;
}
</style>
