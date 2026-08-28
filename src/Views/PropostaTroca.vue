<template>
  <section class="pagina-proposta">
    <div class="conteudo-proposta">
      <RouterLink to="/carrinho" class="voltar">← Voltar para o carrinho</RouterLink>

      <template v-if="produtoAlvo && propostaPermitida">
        <header class="cabecalho-proposta">
          <span>PROPOSTA DE TROCA</span>
          <h1>O que você deseja oferecer?</h1>
          <p>Apresente seu produto ao vendedor com informações claras e boas fotos.</p>
        </header>

        <div v-if="!propostaEnviada" class="painel-proposta">
          <aside class="produto-desejado">
            <p class="rotulo">Você tem interesse em</p>
            <img :src="produtoAlvo.imagem" :alt="produtoAlvo.titulo" />
            <span class="status">{{ produtoAlvo.status }}</span>
            <h2>{{ produtoAlvo.titulo }}</h2>
            <strong>{{ produtoAlvo.preco }}</strong>
          </aside>

          <form class="formulario-proposta" @submit.prevent="enviarProposta">
            <div class="campo">
              <label for="nome-produto">Nome do produto oferecido</label>
              <input
                id="nome-produto"
                v-model.trim="nomeProduto"
                type="text"
                maxlength="100"
                placeholder="Ex.: Notebook Dell Inspiron 15"
                required
              />
            </div>

            <div class="campo">
              <label for="descricao-produto">Descrição da proposta</label>
              <textarea
                id="descricao-produto"
                v-model.trim="descricao"
                rows="6"
                minlength="20"
                maxlength="1000"
                placeholder="Descreva o estado de conservação, tempo de uso e acessórios incluídos."
                required
              ></textarea>
              <small>{{ descricao.length }}/1000 caracteres</small>
            </div>

            <div class="campo">
              <label for="fotos-produto">Fotos do produto</label>
              <label class="area-upload" for="fotos-produto">
                <span class="icone-upload" aria-hidden="true">＋</span>
                <strong>Selecionar fotos</strong>
                <small>Até 4 imagens JPG, PNG ou WEBP, com no máximo 5 MB cada</small>
                <input
                  id="fotos-produto"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  multiple
                  required
                  @change="selecionarFotos"
                />
              </label>
            </div>

            <div v-if="previews.length" class="grade-previews">
              <figure v-for="(foto, index) in previews" :key="foto.url" class="preview-foto">
                <img
                  :src="foto.url"
                  :alt="`Pré-visualização ${index + 1} de ${nomeProduto || 'produto'}`"
                />
                <figcaption>{{ foto.nome }}</figcaption>
                <button
                  type="button"
                  :aria-label="`Remover ${foto.nome}`"
                  @click="removerFoto(index)"
                >
                  ×
                </button>
              </figure>
            </div>

            <p v-if="mensagemErro" class="mensagem-erro" role="alert">{{ mensagemErro }}</p>

            <div class="acoes">
              <RouterLink to="/carrinho" class="botao-cancelar">Cancelar</RouterLink>
              <button class="botao-enviar" type="submit">Enviar proposta</button>
            </div>
          </form>
        </div>

        <div v-else class="proposta-enviada" role="status">
          <div class="icone-sucesso" aria-hidden="true">✓</div>
          <h2>Proposta enviada!</h2>
          <p>
            Sua proposta com <strong>{{ nomeProduto }}</strong> foi enviada para o anúncio
            <strong>{{ produtoAlvo.titulo }}</strong
            >.
          </p>
          <div class="acoes-sucesso">
            <RouterLink to="/carrinho" class="botao-secundario">Voltar ao carrinho</RouterLink>
            <RouterLink to="/" class="botao-principal">Continuar explorando</RouterLink>
          </div>
        </div>
      </template>

      <div v-else class="proposta-indisponivel">
        <div aria-hidden="true">!</div>
        <h1>Proposta indisponível</h1>
        <p>Este produto não foi encontrado ou está disponível somente para venda.</p>
        <RouterLink to="/carrinho">Voltar ao carrinho</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { listaProdutos } from '@/data/produtos'
import { registrarProposta } from '@/data/propostas'

const route = useRoute()
const nomeProduto = ref('')
const descricao = ref('')
const fotos = ref([])
const previews = ref([])
const mensagemErro = ref('')
const propostaEnviada = ref(false)

const produtoAlvo = computed(() => {
  const id = Number(route.params.id)
  return listaProdutos.find((produto) => produto.id === id)
})

const propostaPermitida = computed(
  () => produtoAlvo.value?.status === 'Troca' || produtoAlvo.value?.status === 'Troca/Venda',
)

function limparFotos() {
  previews.value.forEach((foto) => URL.revokeObjectURL(foto.url))
  previews.value = []
  fotos.value = []
}

function selecionarFotos(event) {
  const arquivos = Array.from(event.target.files ?? [])
  mensagemErro.value = ''
  limparFotos()

  if (arquivos.length > 4) {
    mensagemErro.value = 'Selecione no máximo 4 fotos.'
    event.target.value = ''
    return
  }

  const tipoInvalido = arquivos.some(
    (arquivo) => !['image/jpeg', 'image/png', 'image/webp'].includes(arquivo.type),
  )
  if (tipoInvalido) {
    mensagemErro.value = 'Use somente imagens JPG, PNG ou WEBP.'
    event.target.value = ''
    return
  }

  const tamanhoInvalido = arquivos.some((arquivo) => arquivo.size > 5 * 1024 * 1024)
  if (tamanhoInvalido) {
    mensagemErro.value = 'Cada foto deve ter no máximo 5 MB.'
    event.target.value = ''
    return
  }

  fotos.value = arquivos
  previews.value = arquivos.map((arquivo) => ({
    nome: arquivo.name,
    url: URL.createObjectURL(arquivo),
  }))
}

function removerFoto(index) {
  URL.revokeObjectURL(previews.value[index].url)
  previews.value.splice(index, 1)
  fotos.value.splice(index, 1)
}

function enviarProposta() {
  mensagemErro.value = ''

  if (!fotos.value.length) {
    mensagemErro.value = 'Adicione pelo menos uma foto do produto.'
    return
  }

  registrarProposta({
    produtoAlvoId: produtoAlvo.value.id,
    nomeProduto: nomeProduto.value,
    descricao: descricao.value,
    fotos: fotos.value,
  })

  propostaEnviada.value = true
}

onBeforeUnmount(limparFotos)
</script>

<style scoped>
.pagina-proposta {
  --cor-texto: #24324a;
  --cor-suave: #667085;
  --cor-primaria: #185aee;
  --cor-primaria-escura: #0d47bd;
  --cor-azul-claro: #e7f0ff;
  min-height: 100vh;
  padding: 40px 24px 72px;
  background: #f5f7fb;
  box-sizing: border-box;
  color: var(--cor-texto);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.conteudo-proposta {
  max-width: 1120px;
  margin: 0 auto;
}

.voltar {
  display: inline-block;
  margin-bottom: 24px;
  color: var(--cor-primaria);
  font-weight: 600;
  text-decoration: none;
}

.voltar:hover {
  text-decoration: underline;
}

.cabecalho-proposta {
  margin-bottom: 28px;
  text-align: left;
}

.cabecalho-proposta > span {
  display: inline-block;
  padding: 0;
  color: #075ed9;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.cabecalho-proposta h1 {
  margin: 8px 0 6px;
  color: #24324a;
  font-size: clamp(1.8rem, 3vw, 2.3rem);
  letter-spacing: -0.02em;
}

.cabecalho-proposta p {
  margin: 0;
  color: var(--cor-suave);
  font-size: 1rem;
  line-height: 1.5;
}

.painel-proposta {
  display: grid;
  grid-template-columns: minmax(250px, 0.75fr) minmax(0, 1.6fr);
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #dce3ee;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(24, 39, 75, 0.07);
}

.produto-desejado {
  padding: 30px;
  background: #f8faff;
  border-right: 1px solid #dce7f7;
}

.produto-desejado .rotulo {
  margin: 0 0 18px;
  color: #53657d;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
}

.produto-desejado img {
  width: 100%;
  height: 230px;
  margin-bottom: 20px;
  padding: 12px;
  object-fit: contain;
  background: #ffffff;
  border: 1px solid #e1e7f0;
  border-radius: 8px;
  box-sizing: border-box;
}

.produto-desejado .status {
  display: inline-block;
  padding: 5px 10px;
  color: #075ed9;
  background: #e1edff;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 800;
}

.produto-desejado h2 {
  margin: 14px 0 12px;
  font-size: 1.25rem;
  line-height: 1.35;
}

.produto-desejado strong {
  color: var(--cor-primaria);
  font-size: 1.3rem;
}

.formulario-proposta {
  display: grid;
  gap: 22px;
  padding: 34px;
  background: #ffffff;
}

.campo {
  display: grid;
  gap: 8px;
}

.campo > label:first-child {
  color: #344054;
  font-size: 0.92rem;
  font-weight: 700;
}

.campo input,
.campo textarea {
  width: 100%;
  padding: 13px 15px;
  color: var(--cor-texto);
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

.campo input:focus,
.campo textarea:focus {
  background: #ffffff;
  border-color: var(--cor-primaria);
  box-shadow: 0 0 0 3px rgba(24, 90, 238, 0.1);
}

.campo input::placeholder,
.campo textarea::placeholder {
  color: #98a2b3;
}

.campo textarea {
  resize: vertical;
}

.campo > small {
  color: #8a94a6;
  text-align: right;
}

.area-upload {
  display: grid;
  min-height: 140px;
  padding: 24px;
  cursor: pointer;
  text-align: center;
  background: #f8faff;
  border: 2px dashed #a9bddd;
  border-radius: 8px;
  place-items: center;
  transition:
    background-color 0.2s,
    border-color 0.2s;
}

.area-upload:hover {
  background: #eef4ff;
  border-color: var(--cor-primaria);
}

.area-upload input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
}

.area-upload strong {
  color: var(--cor-primaria);
}

.area-upload small {
  color: #7a8496;
}

.icone-upload {
  display: grid;
  width: 42px;
  height: 42px;
  color: #075ed9;
  background: var(--cor-azul-claro);
  border-radius: 6px;
  place-items: center;
  font-size: 1.5rem;
}

.grade-previews {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.preview-foto {
  position: relative;
  min-width: 0;
  margin: 0;
  padding: 8px;
  background: #f6f9fe;
  border: 1px solid #d9e5f7;
  border-radius: 8px;
}

.preview-foto img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

.preview-foto figcaption {
  overflow: hidden;
  margin-top: 6px;
  color: #5b6d85;
  font-size: 0.72rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preview-foto button {
  position: absolute;
  top: 3px;
  right: 3px;
  display: grid;
  width: 26px;
  height: 26px;
  padding: 0;
  color: #ffffff;
  background: #c62828;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  place-items: center;
  font-size: 1.15rem;
}

.mensagem-erro {
  margin: 0;
  padding: 11px 14px;
  color: #a61b1b;
  background: #fff4f1;
  border: 1px solid #f2c4b8;
  border-radius: 6px;
  font-size: 0.9rem;
}

.acoes,
.acoes-sucesso {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.botao-cancelar,
.botao-enviar,
.botao-secundario,
.botao-principal,
.proposta-indisponivel a {
  padding: 11px 18px;
  border-radius: 6px;
  font: inherit;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
}

.botao-cancelar,
.botao-secundario {
  color: #475467;
  background: #ffffff;
  border: 1px solid #cdd9eb;
}

.botao-enviar,
.botao-principal,
.proposta-indisponivel a {
  color: #ffffff;
  background: var(--cor-primaria);
  border: 1px solid var(--cor-primaria);
  cursor: pointer;
  transition: background-color 0.2s;
}

.botao-enviar:hover,
.botao-principal:hover,
.proposta-indisponivel a:hover {
  background: var(--cor-primaria-escura);
}

.proposta-enviada,
.proposta-indisponivel {
  max-width: 650px;
  margin: 40px auto;
  padding: 50px 36px;
  text-align: center;
  background: #ffffff;
  border: 1px solid #d9e5f7;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(24, 39, 75, 0.07);
}

.icone-sucesso,
.proposta-indisponivel > div {
  display: grid;
  width: 68px;
  height: 68px;
  margin: 0 auto 20px;
  color: #ffffff;
  background: #1f9d55;
  border-radius: 50%;
  place-items: center;
  font-size: 2rem;
  font-weight: 800;
}

.proposta-indisponivel > div {
  background: #e29a17;
}

.proposta-enviada h2,
.proposta-indisponivel h1 {
  margin: 0 0 12px;
}

.proposta-enviada p,
.proposta-indisponivel p {
  margin: 0 0 28px;
  color: var(--cor-suave);
  line-height: 1.65;
}

.acoes-sucesso {
  justify-content: center;
}

@media (max-width: 800px) {
  .painel-proposta {
    grid-template-columns: 1fr;
  }

  .produto-desejado {
    border-right: 0;
    border-bottom: 1px solid #e1eaf7;
  }

  .produto-desejado img {
    height: 200px;
  }
}

@media (max-width: 560px) {
  .pagina-proposta {
    padding: 32px 15px 56px;
  }

  .produto-desejado,
  .formulario-proposta {
    padding: 24px;
  }

  .grade-previews {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .acoes,
  .acoes-sucesso {
    flex-direction: column;
  }
}
</style>
