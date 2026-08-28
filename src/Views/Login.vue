<template>
  <div class="pagina-auth">
    <h1>Log<span class="azul">in</span></h1>

    <form @submit.prevent="entrar">
      <div class="campo">
        <label for="email">E-MAIL:</label>
        <input id="email" v-model.trim="email" type="email" placeholder="voce@email.com" required>
      </div>

      <div class="campo">
        <label for="senha">SENHA:</label>
        <input id="senha" v-model="senha" type="password" placeholder="Senha..." required>
      </div>

      <div class="botoes">
        <RouterLink to="/cadastrar" class="btn-cadastrar">CADASTRAR-SE</RouterLink>
        <button type="submit" class="btn-salvar" :disabled="entrando">
          {{ entrando ? 'ENTRANDO...' : 'ENTRAR' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
defineOptions({ name: 'LoginUsuario' })
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { entrar as autenticar } from '@/data/auth.js'

const email = ref('')
const senha = ref('')
const entrando = ref(false)
const router = useRouter()

async function entrar() {
  entrando.value = true

  try {
    await autenticar({ email: email.value, senha: senha.value })
    alert('Login realizado com sucesso!')
    router.push('/')
  } catch (erro) {
    alert(erro.message)
  } finally {
    entrando.value = false
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
.btn-salvar:disabled {
  cursor: wait;
  opacity: 0.7;
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
