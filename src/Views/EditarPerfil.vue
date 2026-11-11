<template>
  <section v-if="usuarioAtual" class="pagina-edicao">
    <div class="cartao-edicao">
      <header class="cabecalho-edicao">
        <label class="avatar-editavel" for="foto-perfil">
          <img :src="foto" :alt="`Foto de ${nome}`" />
          <span>Alterar foto</span>
          <input
            id="foto-perfil"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            @change="selecionarFoto"
          />
        </label>

        <div>
          <span class="etiqueta">MINHA CONTA</span>
          <h1>Editar perfil</h1>
          <p>Atualize seus dados pessoais e sua foto de perfil.</p>
        </div>
      </header>

      <form class="formulario-edicao" @submit.prevent="salvarPerfil">
        <div class="campos">
          <div class="campo campo-largo">
            <label for="nome">Nome completo</label>
            <input
              id="nome"
              v-model.trim="nome"
              type="text"
              maxlength="100"
              autocomplete="name"
              required
            />
          </div>

          <div class="campo">
            <label for="email">E-mail</label>
            <input
              id="email"
              v-model.trim="email"
              type="email"
              maxlength="150"
              autocomplete="email"
              required
            />
          </div>

          <div class="campo">
            <label for="telefone">Telefone</label>
            <input
              id="telefone"
              v-model.trim="telefone"
              type="tel"
              maxlength="20"
              autocomplete="tel"
              placeholder="(00) 00000-0000"
              required
              inputmode="numeric"
              onkeypress="return (event.charCode >= 48 && event.charCode <= 57)
              || event.charCode == 8
              || event.charCode == 0"
              @input="formatPhone"
            />
          </div>
        </div>

        <p v-if="salvando" class="mensagem-carregando">Aguarde...</p>
        <p v-if="mensagemSucesso" class="mensagem-sucesso">{{ mensagemSucesso }}</p>
        <p v-if="mensagemErro" class="mensagem-erro" role="alert">{{ mensagemErro }}</p>

        <div class="acoes">
          <button class="botao-excluir" type="button" :disabled="salvando" @click="excluirConta">
            Excluir conta
          </button>
          <RouterLink to="/paginaUsuario" class="botao-cancelar">Cancelar</RouterLink>
          <button class="botao-salvar" type="submit" :disabled="salvando">
            {{ salvando ? 'Salvando...' : 'Salvar alterações' }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { atualizarUsuario, excluirUsuario, usuarioAtual } from '@/data/auth.js'
import { reduzirImagem } from '@/data/imagem.js'

const router = useRouter()
const nome = ref(usuarioAtual.value?.nome ?? '')
const email = ref(usuarioAtual.value?.email ?? '')
const telefone = ref(usuarioAtual.value?.telefone ?? '')
const foto = ref(usuarioAtual.value?.foto ?? '')
const mensagemErro = ref('')
const mensagemSucesso = ref('')
const salvando = ref(false)

async function selecionarFoto(event) {
  const arquivo = event.target.files[0]
  mensagemErro.value = ''
  if (!arquivo) return

  if (arquivo.size > 5 * 1024 * 1024) {
    mensagemErro.value = 'Escolha uma imagem de até 5 MB.'
    event.target.value = ''
    return
  }

  try {
    foto.value = await reduzirImagem(arquivo, 300)
  } catch (e) {
    mensagemErro.value = e.message
    event.target.value = ''
  }
}

async function salvarPerfil() {
  mensagemErro.value = ''
  mensagemSucesso.value = ''

  if (nome.value.trim() === '') {
    mensagemErro.value = 'Digite seu nome.'
    return
  }
  if (telefone.value.length < 14) {
    mensagemErro.value = 'Digite um telefone válido.'
    return
  }

  salvando.value = true

  try {
    await atualizarUsuario({
      nome: nome.value,
      email: email.value,
      telefone: telefone.value,
      foto: foto.value,
    })
    mensagemSucesso.value = 'Perfil atualizado com sucesso!'
    setTimeout(() => router.push({ name: 'paginaUsuario' }), 1000)
  } catch (e) {
    mensagemErro.value = e.message
  } finally {
    salvando.value = false
  }
}

async function excluirConta() {
  if (!confirm('Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.')) return

  mensagemErro.value = ''
  salvando.value = true

  try {
    await excluirUsuario(usuarioAtual.value.id)
    router.push({ name: 'home' })
  } catch (e) {
    mensagemErro.value = e.message
    salvando.value = false
  }
}

function formatPhone(event) {
  let numeros = event.target.value.replace(/\D/g, '').slice(0, 11)

  if (numeros.length > 10) {
    numeros = numeros.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
  } else if (numeros.length > 6) {
    numeros = numeros.replace(/^(\d{2})(\d{4})(\d*)$/, '($1) $2-$3')
  } else if (numeros.length > 2) {
    numeros = numeros.replace(/^(\d{2})(\d*)$/, '($1) $2')
  }

  telefone.value = numeros
}
</script>

<style scoped>
.pagina-edicao {
  min-height: 100vh;
  padding: 48px 24px 72px;
  color: #24324a;
  background: #f5f7fb;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.cartao-edicao {
  max-width: 900px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #dce3ee;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(24, 39, 75, 0.07);
}

.cabecalho-edicao {
  display: flex;
  align-items: center;
  gap: 26px;
  padding: 32px;
  border-bottom: 1px solid #e3e8f0;
}

.avatar-editavel {
  position: relative;
  display: block;
  width: 112px;
  height: 112px;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
  background: #edf3ff;
  border: 3px solid #dce8ff;
  border-radius: 50%;
}

.avatar-editavel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-editavel span {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 7px 4px 10px;
  color: #ffffff;
  background: rgba(13, 27, 54, 0.76);
  font-size: 0.7rem;
  font-weight: 700;
  text-align: center;
}

.avatar-editavel input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
}

.etiqueta {
  color: #075ed9;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.cabecalho-edicao h1 {
  margin: 6px 0;
  color: #18243a;
  font-size: 2rem;
}

.cabecalho-edicao p {
  margin: 0;
  color: #667085;
  line-height: 1.5;
}

.formulario-edicao {
  padding: 32px;
}

.campos {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.campo {
  display: grid;
  gap: 8px;
}

.campo-largo {
  grid-column: 1 / -1;
}

.campo label {
  color: #344054;
  font-size: 0.9rem;
  font-weight: 700;
}

.campo input {
  width: 100%;
  padding: 12px 14px;
  color: #24324a;
  background: #fcfcfd;
  border: 1px solid #d5dbe7;
  border-radius: 6px;
  box-sizing: border-box;
  font: inherit;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.campo input:focus {
  background: #ffffff;
  border-color: #185aee;
  box-shadow: 0 0 0 3px rgba(24, 90, 238, 0.1);
}

.mensagem-erro {
  margin: 22px 0 0;
  padding: 11px 14px;
  color: #a61b1b;
  background: #fff4f1;
  border: 1px solid #f2c4b8;
  border-radius: 6px;
}

.acoes {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
}

.botao-cancelar,
.botao-salvar {
  min-width: 140px;
  padding: 11px 18px;
  border-radius: 6px;
  box-sizing: border-box;
  font: inherit;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
}

.botao-cancelar {
  color: #475467;
  background: #ffffff;
  border: 1px solid #cdd9eb;
}

.botao-salvar {
  color: #ffffff;
  background: #185aee;
  border: 1px solid #185aee;
  cursor: pointer;
  transition: background-color 0.2s;
}

.botao-salvar:hover:not(:disabled) {
  background: #0d47bd;
}

.botao-salvar:disabled {
  cursor: wait;
  opacity: 0.65;
}

@media (max-width: 640px) {
  .pagina-edicao {
    padding: 32px 16px 56px;
  }

  .cabecalho-edicao {
    flex-direction: column;
    padding: 24px;
    text-align: center;
  }

  .formulario-edicao {
    padding: 24px;
  }

  .campos {
    grid-template-columns: 1fr;
  }

  .campo-largo {
    grid-column: auto;
  }

  .acoes {
    flex-direction: column-reverse;
  }

  .botao-cancelar,
  .botao-salvar,
  .botao-excluir {
    width: 100%;
    margin-right: 0;
  }
}

.mensagem-carregando,
.mensagem-sucesso {
  margin: 22px 0 0;
  padding: 11px 14px;
  border-radius: 6px;
}

.mensagem-carregando {
  color: #334964;
  background: #f2f6ff;
}

.mensagem-sucesso {
  color: #146c2e;
  background: #eefaf1;
  border: 1px solid #b7e4c4;
}

.botao-excluir {
  min-width: 140px;
  margin-right: auto;
  padding: 11px 18px;
  color: #a61b1b;
  background: #ffffff;
  border: 1px solid #f2c4b8;
  border-radius: 6px;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
}

.botao-excluir:hover:not(:disabled) {
  background: #fff4f1;
}
</style>
