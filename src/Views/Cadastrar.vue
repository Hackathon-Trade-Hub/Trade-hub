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
        <input id="telefone" v-model.trim="telefone" type="tel" placeholder="(00) 00000-0000" required>
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
.preview-foto {
  display: block;
  width: 96px;
  height: 96px;
  margin: -15px auto 25px;
  object-fit: cover;
  border: 2px solid #0066ff;
  border-radius: 50%;
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
.btn-salvar:disabled {
  cursor: wait;
  opacity: 0.7;
}
</style>
