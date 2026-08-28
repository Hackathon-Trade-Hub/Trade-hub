<template>
<div class="pagina-auth">
    <h1>Cadastrar<span class="azul">-se</span></h1>

    <form @submit.prevent="cadastrar">
      <div class="campo">
        <label for="nome">NOME:</label>
        <input id="nome" v-model.trim="nome" type="text" placeholder="Seu nome completo" required>
      </div>

      <div class="campo">
        <label for="email">E-MAIL:</label>
        <input id="email" v-model.trim="email" type="email" placeholder="voce@email.com" required>
      </div>

      <div class="campo">
        <label for="telefone">TELEFONE:</label>
        <input id="telefone" v-model.trim="telefone" type="tel" placeholder="(00) 00000-0000" required
        @input="formatPhone"
         inputmode="numeric"
              onkeypress="return (event.charCode >= 48 && event.charCode <= 57)
              || event.charCode == 8
              || event.charCode == 0"
        >
      </div>

      <div class="campo">
        <label for="foto">FOTO:</label>
        <input id="foto" type="file" accept="image/png,image/jpeg,image/webp" required @change="selecionarFoto">
      </div>

      <img v-if="foto" :src="foto" class="preview-foto" alt="Prévia da foto de perfil">

      <div class="campo">
        <label for="senha">SENHA:</label>
        <input id="senha" v-model="senha" type="password" placeholder="No mínimo 6 caracteres" minlength="6" required>
      </div>

      <div class="botoes">
        <button type="submit" class="btn-salvar" :disabled="enviando">
          {{ enviando ? 'SALVANDO...' : 'CRIAR CONTA' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
defineOptions({ name: 'CadastroUsuario' })
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { cadastrarUsuario } from '@/data/auth.js'

const nome = ref('')
const email = ref('')
const telefone = ref('')
const senha = ref('')
const foto = ref('')
const enviando = ref(false)
const router = useRouter()

function selecionarFoto(event) {
  const arquivo = event.target.files?.[0]

  if (!arquivo) return
  if (arquivo.size > 1024 * 1024) {
    alert('Escolha uma imagem de até 1 MB.')
    event.target.value = ''
    foto.value = ''
    return
  }

  const leitor = new FileReader()
  leitor.onload = () => {
    foto.value = leitor.result
  }
  leitor.readAsDataURL(arquivo)
}

async function cadastrar() {
  if (!foto.value) {
    alert('Selecione uma foto de perfil.')
    return
  }

  enviando.value = true

  try {
    await cadastrarUsuario({
      nome: nome.value,
      email: email.value,
      telefone: telefone.value,
      senha: senha.value,
      foto: foto.value,
    })

    alert('Conta criada com sucesso! Agora faça login.')
    router.push('/login')
  } catch (erro) {
    alert(erro.message)
  } finally {
    enviando.value = false
  }
}


const formatPhone = (event) => {
  let value = event.target.value.replace(/\D/g, '')

  if (value.length > 11) {
    value = value.slice(0, 11)
  }

  if (value.length > 10) {
    value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3')
  } else if (value.length > 6) {
    value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3')
  } else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2')
  } else if (value.length > 0) {
    value = value.replace(/^(\d*)/, '($1')
  }


 telefone.value = value
}
</script>

<style scoped>
.pagina-auth {
  position: relative;
  z-index: 5;
  width: min(calc(100% - 32px), 640px);
  margin: -92px auto 80px;
  padding: 38px 42px 42px;
  color: #1b2b44;
  background: #ffffff;
  border: 1px solid #dbe5f3;
  border-radius: 22px;
  box-shadow: 0 18px 48px rgba(25, 63, 119, 0.14);
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  margin: 0 0 34px;
  color: #162842;
  font-size: clamp(2rem, 5vw, 2.65rem);
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
  gap: 20px;
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
  min-height: 48px;
  padding: 12px 14px;
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

.campo input[type='file'] {
  padding: 7px;
  color: #60728a;
  cursor: pointer;
}

.campo input[type='file']::file-selector-button {
  margin-right: 12px;
  padding: 9px 13px;
  color: #185aee;
  background: #edf4ff;
  border: 0;
  border-radius: 7px;
  font: inherit;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
}

.preview-foto {
  display: block;
  width: 104px;
  height: 104px;
  margin: -4px auto 2px;
  object-fit: cover;
  background: #edf3ff;
  border: 4px solid #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 0 2px #b8cff5, 0 8px 22px rgba(22, 57, 105, 0.16);
}

.botoes {
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;
}

.btn-salvar {
  min-width: 190px;
  min-height: 48px;
  padding: 12px 20px;
  color: #ffffff;
  background: #185aee;
  border: 1px solid #185aee;
  border-radius: 10px;
  box-shadow: 0 8px 18px rgba(24, 90, 238, 0.2);
  cursor: pointer;
  font: inherit;
  font-size: 0.88rem;
  font-weight: 750;
  letter-spacing: 0.03em;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.btn-salvar:hover:not(:disabled) {
  background: #0f4dcc;
  border-color: #0f4dcc;
  box-shadow: 0 10px 22px rgba(24, 90, 238, 0.28);
  transform: translateY(-1px);
}

.btn-salvar:disabled {
  cursor: wait;
  opacity: 0.62;
  box-shadow: none;
}

@media (max-width: 640px) {
  .pagina-auth {
    width: min(calc(100% - 24px), 640px);
    margin-top: -64px;
    padding: 30px 22px 32px;
    border-radius: 17px;
  }

  h1 {
    margin-bottom: 28px;
  }

  .botoes,
  .btn-salvar {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .campo input,
  .btn-salvar {
    transition: none;
  }
}
</style>
