<template>
  <section class="cadastro-produto">
    <header class="cabecalho-cadastro">
      <span>NOVO ANÚNCIO</span>
      <h1>Cadastre seu produto</h1>
      <p>Preencha os dados para publicar o seu item na TradeHub.</p>
    </header>

    <form class="formulario-produto" @submit.prevent="enviarProduto">
      <div class="campo campo-largo">
        <label for="titulo">Título do produto</label>
        <input id="titulo" v-model.trim="titulo" type="text" placeholder="Ex.: Bicicleta urbana aro 29" required>
      </div>

      <div class="linha-campos">
        <div class="campo">
          <label for="preco">Preço</label>
          <input id="preco" v-model.trim="preco" type="text" inputmode="decimal" placeholder="Ex.: R$ 250,00" required @blur="formatarPreco">
        </div>

        <div class="campo">
          <label for="categoria">Categoria</label>
          <select id="categoria" v-model="categoria" required>
            <option value="" disabled>Selecione uma categoria</option>
            <option v-for="opcao in categorias" :key="opcao" :value="opcao">{{ opcao }}</option>
          </select>
        </div>
      </div>

      <fieldset class="tipo-anuncio">
        <legend>O que você deseja fazer?</legend>
        <label :class="{ selecionada: tipo === 'Venda' }"><input v-model="tipo" type="radio" value="Venda" required> Vender</label>
        <label :class="{ selecionada: tipo === 'Troca' }"><input v-model="tipo" type="radio" value="Troca"> Trocar</label>
        <label :class="{ selecionada: tipo === 'Troca/Venda' }"><input v-model="tipo" type="radio" value="Troca/Venda"> Trocar ou vender</label>
      </fieldset>

      <div class="campo campo-largo">
        <label for="descricao">Descrição</label>
        <textarea id="descricao" v-model.trim="descricao" rows="5" placeholder="Conte o estado de conservação e os detalhes importantes." required></textarea>
      </div>

      <div class="campo campo-largo">
        <label for="imagem">Imagem do produto</label>
        <label class="area-upload" for="imagem">
          <strong>Selecionar imagem</strong>
          <small>PNG, JPG ou WEBP</small>
          <input id="imagem" type="file" accept="image/*" required @change="selecionarImagem">
        </label>
      </div>

      <div v-if="preview" class="preview-container">
        <img :src="preview" alt="Pré-visualização do produto">
        <div><strong>Imagem selecionada</strong><p>{{ imagem?.name }}</p></div>
      </div>

      <div class="acoes-formulario">
        <router-link to="/" class="botao-cancelar">Cancelar</router-link>
        <button class="botao-publicar" type="submit">Publicar produto</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { listaProdutos } from '@/data/produtos'

const router = useRouter()
const titulo = ref('')
const preco = ref('')
const categoria = ref('')
const tipo = ref('')
const descricao = ref('')
const imagem = ref(null)
const preview = ref('')
const categorias = ['Casa e Móveis', 'Eletrodomésticos', 'Esportes', 'Ferramentas', 'Espaço Pet', 'Brinquedos', 'Tecnologia', 'Acessórios']

function selecionarImagem(event) {
  const arquivo = event.target.files[0]
  if (preview.value) URL.revokeObjectURL(preview.value)
  imagem.value = arquivo ?? null
  preview.value = arquivo ? URL.createObjectURL(arquivo) : ''
}

function enviarProduto() {
  formatarPreco()

  const maiorId = Math.max(...listaProdutos.map((produto) => produto.id), 0)

  listaProdutos.push({
    id: maiorId + 1,
    titulo: titulo.value,
    preco: preco.value,
    categoria: categoria.value,
    status: tipo.value,
    descricao: descricao.value,
    imagem: preview.value
  })

  router.push({ name: 'home' })
}

function formatarPreco() {
  const texto = preco.value
    .replace('R$', '')
    .replace(/\s/g, '')
    .replace(/\./g, '')
    .replace(',', '.')

  const valor = Number(texto)

  if (Number.isFinite(valor) && valor > 0) {
    preco.value = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }
}
</script>

<style scoped>
.cadastro-produto { min-height: 100%; padding: 56px 24px 80px; background: linear-gradient(180deg, #f2f7ff, #fff 48%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; box-sizing: border-box; }
.cabecalho-cadastro, .formulario-produto { max-width: 820px; margin: 0 auto; }
.cabecalho-cadastro { margin-bottom: 28px; text-align: center; }
.cabecalho-cadastro > span { display: inline-block; padding: 6px 12px; color: #075ed9; background: #dcebff; border-radius: 999px; font-size: 12px; font-weight: 800; letter-spacing: .08em; }
.cabecalho-cadastro h1 { margin: 14px 0 8px; color: #10233e; font-size: clamp(30px, 4vw, 42px); }
.cabecalho-cadastro p { margin: 0; color: #5b6d85; }
.formulario-produto { display: grid; gap: 22px; padding: 40px; background: #fff; border: 1px solid #d9e5f7; border-radius: 22px; box-shadow: 0 18px 45px rgba(12, 66, 145, .12); }
.linha-campos { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.campo { display: grid; gap: 8px; }
.campo label, .tipo-anuncio legend { color: #253b5a; font-size: 15px; font-weight: 700; }
.campo input:not([type='file']), .campo select, .campo textarea { width: 100%; padding: 13px 14px; color: #1d2e46; border: 1px solid #cbd9ec; border-radius: 10px; box-sizing: border-box; font: inherit; outline: none; }
.campo textarea { resize: vertical; }
.campo input:focus, .campo select:focus, .campo textarea:focus { border-color: #0066ff; box-shadow: 0 0 0 3px rgba(0, 102, 255, .12); }
.tipo-anuncio { display: flex; flex-wrap: wrap; gap: 10px; padding: 0; border: 0; }
.tipo-anuncio legend { width: 100%; }
.tipo-anuncio label { padding: 11px 15px; color: #4b5f79; border: 1px solid #cbd9ec; border-radius: 10px; cursor: pointer; font-weight: 600; }
.tipo-anuncio label.selecionada { color: #075ed9; background: #edf5ff; border-color: #0066ff; }
.tipo-anuncio input { accent-color: #0066ff; }
.area-upload { display: grid; gap: 4px; padding: 24px; color: #075ed9 !important; text-align: center; background: #f5f9ff; border: 2px dashed #8ab8ff; border-radius: 12px; cursor: pointer; }
.area-upload small { color: #6d7f97; font-weight: 400; }
.area-upload input { display: none; }
.preview-container { display: flex; align-items: center; gap: 16px; padding: 12px; background: #f7faff; border-radius: 12px; }
.preview-container img { width: 82px; height: 82px; object-fit: contain; background: #fff; border-radius: 8px; }
.preview-container p { margin: 4px 0 0; color: #64758d; font-size: 14px; }
.acoes-formulario { display: flex; justify-content: flex-end; gap: 14px; }
.botao-cancelar, .botao-publicar { padding: 13px 22px; border-radius: 10px; font: inherit; font-weight: 700; text-decoration: none; cursor: pointer; }
.botao-cancelar { color: #075ed9; background: #fff; border: 1px solid #9fc4ff; }
.botao-publicar { color: #fff; background: #0066ff; border: 1px solid #0066ff; box-shadow: 0 8px 16px rgba(0, 102, 255, .2); }
.botao-publicar:hover { background: #0052cc; }
@media (max-width: 620px) { .cadastro-produto { padding: 34px 16px 56px; } .formulario-produto { padding: 26px 20px; } .linha-campos { grid-template-columns: 1fr; } .acoes-formulario { flex-direction: column-reverse; } .botao-cancelar, .botao-publicar { text-align: center; } }
</style>
