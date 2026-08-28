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
  position: relative;
  z-index: 5;
  width: min(calc(100% - 32px), 540px);
  margin: -92px auto 80px;
  padding: 42px 42px 46px;
  color: #1b2b44;
  background: #ffffff;
  border: 1px solid #dbe5f3;
  border-radius: 22px;
  box-shadow: 0 18px 48px rgba(25, 63, 119, 0.14);
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  margin: 0 0 36px;
  color: #162842;
  font-size: clamp(2.1rem, 5vw, 2.7rem);
  font-weight: 750;
  letter-spacing: -0.04em;
  line-height: 1.1;
  text-align: center;
}

h1::after {
  display: block;
  width: 42px;
  height: 4px;
  margin: 15px auto 0;
  background: #185aee;
  border-radius: 999px;
  content: '';
}

.azul {
  color: #185aee;
}

form {
  display: grid;
  gap: 22px;
}

.campo {
  display: grid;
  gap: 8px;
}

.campo label {
  color: #334964;
  font-size: 0.76rem;
  font-weight: 750;
  letter-spacing: 0.07em;
  text-align: left;
}

.campo input {
  width: 100%;
  min-height: 50px;
  padding: 13px 14px;
  color: #1c2d45;
  background: #fbfcfe;
  border: 1px solid #c8d5e6;
  border-radius: 10px;
  box-sizing: border-box;
  font: inherit;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.campo input::placeholder {
  color: #8b99ab;
}

.campo input:hover {
  border-color: #9db2ce;
}

.campo input:focus {
  background: #ffffff;
  border-color: #185aee;
  box-shadow: 0 0 0 4px rgba(24, 90, 238, 0.12);
  outline: none;
}

.botoes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 8px;
}

.btn-cadastrar,
.btn-salvar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 11px 16px;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 750;
  letter-spacing: 0.025em;
  text-align: center;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.btn-salvar:disabled {
  cursor: wait;
  opacity: 0.62;
  box-shadow: none;
}

.btn-cadastrar {
  color: #185aee;
  background: #ffffff;
  border: 1px solid #9fbbeb;
  text-decoration: none;
}

.btn-cadastrar:hover {
  color: #0f4dcc;
  background: #f2f6ff;
  border-color: #185aee;
  transform: translateY(-1px);
}

.btn-salvar {
  color: #ffffff;
  background: #185aee;
  border: 1px solid #185aee;
  box-shadow: 0 8px 18px rgba(24, 90, 238, 0.2);
}

.btn-salvar:hover:not(:disabled) {
  background: #0f4dcc;
  border-color: #0f4dcc;
  box-shadow: 0 10px 22px rgba(24, 90, 238, 0.28);
  transform: translateY(-1px);
}

@media (max-width: 560px) {
  .pagina-auth {
    width: min(calc(100% - 24px), 540px);
    margin-top: -64px;
    padding: 32px 22px 36px;
    border-radius: 17px;
  }

  h1 {
    margin-bottom: 30px;
  }

  .botoes {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .campo input,
  .btn-cadastrar,
  .btn-salvar {
    transition: none;
  }
}
</style>
