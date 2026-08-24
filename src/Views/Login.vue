<template>
  <div class="pagina-auth">
    <h1>Log<span class="azul">in</span></h1>

    <form @submit.prevent="entrar">
      <div class="campo">
        <label>USUÁRIO/EMAIL:</label>
        <input type="text" v-model="usuarioOuEmail" placeholder="Seu usuário ou email...">
      </div>

      <div class="campo">
        <label>SENHA:</label>
        <input type="password" v-model="senha" placeholder="Senha...">
      </div>

      <button type="button" class="btn-google">Login com o Google</button>

      <div class="botoes">
        <RouterLink to="/registrar" class="btn-cadastrar">CADASTRAR-SE</RouterLink>
        <button type="submit" class="btn-salvar">SALVAR</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usuarioCadastrado } from '@/data/usuario.js'

const usuarioOuEmail = ref('')
const senha = ref('')
const router = useRouter()

function entrar() {
  const loginCorreto =
    usuarioCadastrado.usuario !== '' &&
    (usuarioOuEmail.value === usuarioCadastrado.usuario || usuarioOuEmail.value === usuarioCadastrado.email) &&
    senha.value === usuarioCadastrado.senha

  if (loginCorreto) {
    alert('Login realizado com sucesso!')
    router.push('/')
  } else {
    alert('Usuário/email ou senha incorretos!')
  }
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
  flex-direction: column;
  align-items: center;
  margin-bottom: 35px;
}

.campo label {
  width: auto;
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
  gap: 20px;
}
.btn-cadastrar,
.btn-salvar {
  min-width: 110px;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  text-align: center;
}
.btn-cadastrar {
  border: 1px solid #333;
  background: #fff;
  color: #000;
  text-decoration: none;
}
.btn-salvar {
  border: none;
  background: #0066ff;
  color: #fff;
  font-weight: bold;
}
</style>
