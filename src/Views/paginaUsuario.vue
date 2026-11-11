<template>
  <main v-if="usuarioAtual" class="pagina-usuario">
    <nav class="breadcrumb" aria-label="Navegação estrutural">
      <RouterLink to="/">Início</RouterLink>
      <span aria-hidden="true">/</span>
      <span>Minha conta</span>
    </nav>

    <header class="cabecalho-pagina">
      <span class="cabecalho-etiqueta">ÁREA DO CLIENTE</span>
      <h1>Minha conta</h1>
      <p>Acompanhe seus dados e os produtos que você salvou.</p>
    </header>

    <div class="painel-conta">
      <aside class="coluna-perfil">
        <section class="resumo-perfil">
          <div class="avatar">
            <img :src="usuarioAtual.foto" :alt="`Foto de ${usuarioAtual.nome}`" />
          </div>

          <div class="usuario">
            <span class="status-conta">Conta ativa</span>
            <h2>{{ usuarioAtual.nome }}</h2>
            <p>{{ usuarioAtual.email }}</p>
          </div>

          <RouterLink to="/editarperfil" class="btn-editar">Editar perfil</RouterLink>
        </section>

        <nav class="menu-conta" aria-label="Seções da conta">
          <a class="menu-item menu-item--ativo" href="#dados">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
            </svg>
            <span>Meus dados</span>
          </a>
          <a class="menu-item" href="#meus-produtos">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9ZM4.5 7.8 12 12l7.5-4.2M12 12v9" />
            </svg>
            <span>Meus produtos</span>
            <strong>{{ produtosDoUsuario.length }}</strong>
          </a>
          <a class="menu-item" href="#pedidos">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 7h18v13H3zM7 7V4h10v3M7 12h10M7 16h6" />
            </svg>
            <span>Meus pedidos</span>
            <strong>{{ pedidosDoUsuario.length }}</strong>
          </a>
          <a class="menu-item" href="#favoritos">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
            </svg>
            <span>Favoritos</span>
            <strong>{{ produtosFavoritos.length }}</strong>
          </a>
        </nav>
      </aside>

      <div class="conteudo-conta">
        <section id="pedidos" class="pedidos" aria-labelledby="titulo-pedidos">
          <div class="secao-cabecalho">
            <div>
              <span class="secao-etiqueta">ACOMPANHAMENTO</span>
              <h2 id="titulo-pedidos">Meus pedidos</h2>
              <p>Acompanhe a entrega, altere o endereço e cancele pedidos antes de receber.</p>
            </div>
          </div>

          <p v-if="mensagemPedidos" class="mensagem-pedido" role="status">{{ mensagemPedidos }}</p>
          <p v-if="erroPedidos" class="erro-pedido" role="alert">{{ erroPedidos }}</p>

          <div v-if="pedidosDoUsuario.length" class="lista-pedidos">
            <article v-for="pedido in pedidosDoUsuario" :key="pedido.id" class="pedido-card">
              <header class="pedido-cabecalho">
                <div>
                  <span class="pedido-numero">Pedido #{{ pedido.id.slice(-8).toUpperCase() }}</span>
                  <p>Realizado em {{ formatarData(pedido.criadoEm) }}</p>
                </div>
                <span class="pedido-status" :class="classeStatus(pedido.status)">
                  {{ pedido.status }}
                </span>
              </header>

              <div v-if="pedido.status !== 'Cancelado'" class="rastreamento">
                <div
                  v-for="(etapa, indice) in etapasPedido"
                  :key="etapa"
                  class="etapa-rastreamento"
                  :class="{ concluida: indice === 0 }"
                >
                  <span class="etapa-ponto"></span>
                  <span>{{ etapa }}</span>
                </div>
              </div>

              <div class="pedido-conteudo">
                <div class="pedido-produtos">
                  <div v-for="produto in pedido.produtos" :key="produto.id" class="pedido-produto">
                    <img :src="produto.imagem" :alt="produto.titulo">
                    <div>
                      <strong>{{ produto.titulo }}</strong>
                      <span>{{ produto.quantidade }} {{ produto.quantidade === 1 ? 'unidade' : 'unidades' }}</span>
                    </div>
                  </div>
                </div>

                <div class="pedido-entrega">
                  <strong>Entrega por {{ pedido.transportadora.nome }}</strong>
                  <span>Previsão: {{ formatarData(pedido.previsaoEntrega) }}</span>
                  <span>{{ formatarMoeda(pedido.transportadora.valorFrete) }} de frete</span>
                  <span>{{ formatarEndereco(pedido.endereco) }}</span>
                </div>
              </div>

              <form
                v-if="pedidoEmAlteracao === pedido.id"
                class="form-endereco"
                @submit.prevent="salvarEnderecoPedido(pedido.id)"
              >
                <h3>Alterar endereço de entrega</h3>
                <div class="campos-pedido">
                  <label>
                    CEP
                    <input v-model.trim="enderecoSolicitado.cep" autocomplete="postal-code" required>
                  </label>
                  <label class="campo-pedido-largo">
                    Rua / avenida
                    <input v-model.trim="enderecoSolicitado.rua" autocomplete="address-line1" required>
                  </label>
                  <label>
                    Número
                    <input v-model.trim="enderecoSolicitado.numero" required>
                  </label>
                  <label>
                    Complemento
                    <input v-model.trim="enderecoSolicitado.complemento">
                  </label>
                  <label>
                    Bairro
                    <input v-model.trim="enderecoSolicitado.bairro" required>
                  </label>
                  <label>
                    Cidade
                    <input v-model.trim="enderecoSolicitado.cidade" required>
                  </label>
                  <label>
                    Estado
                    <input v-model.trim="enderecoSolicitado.estado" maxlength="2" required>
                  </label>
                </div>
                <div class="acoes-pedido">
                  <button type="button" class="acao-secundaria" @click="pedidoEmAlteracao = ''">
                    Voltar
                  </button>
                  <button type="submit" class="acao-principal">Salvar novo endereço</button>
                </div>
              </form>

              <footer
                v-if="pedido.status !== 'Entregue' && pedido.status !== 'Cancelado'"
                class="acoes-pedido"
              >
                <button
                  v-if="pedidoEmAlteracao !== pedido.id"
                  type="button"
                  class="acao-secundaria"
                  @click="iniciarAlteracaoEndereco(pedido)"
                >
                  Alterar endereço
                </button>
                <button
                  type="button"
                  class="acao-cancelar"
                  :class="{ 'acao-cancelar--confirmar': pedidoParaExcluir === pedido.id }"
                  @click="alternarConfirmacaoExclusao(pedido.id)"
                >
                  {{ pedidoParaExcluir === pedido.id ? 'CONFIRMAR' : 'Excluir pedido' }}
                </button>
              </footer>
            </article>
          </div>

          <div v-else class="pedidos-vazio">
            <div aria-hidden="true">📦</div>
            <h3>Seus próximos achados começam por aqui</h3>
            <p>Quando você finalizar uma compra, o acompanhamento da entrega aparecerá nesta área.</p>
            <RouterLink to="/comprar" class="btn-explorar">Explorar produtos</RouterLink>
          </div>
        </section>

        <section id="dados" class="dados-conta" aria-labelledby="titulo-dados">
          <div class="secao-cabecalho">
            <div>
              <span class="secao-etiqueta">PERFIL</span>
              <h2 id="titulo-dados">Dados da conta</h2>
              <p>Confira as informações usadas no seu cadastro.</p>
            </div>
            <RouterLink to="/editarperfil" class="editar-link">Alterar dados</RouterLink>
          </div>

          <div class="informacoes">
            <div class="info-item">
              <span class="label">Nome completo</span>
              <span class="valor">{{ usuarioAtual.nome }}</span>
            </div>

            <div class="info-item">
              <span class="label">E-mail</span>
              <span class="valor">{{ usuarioAtual.email }}</span>
            </div>

            <div class="info-item">
              <span class="label">Telefone</span>
              <span class="valor">{{ usuarioAtual.telefone }}</span>
            </div>
          </div>
        </section>

        <section
          id="meus-produtos"
          class="produtos-usuario"
          aria-labelledby="titulo-meus-produtos"
        >
          <div class="secao-cabecalho produtos-cabecalho">
            <div>
              <span class="secao-etiqueta">MEUS ANÚNCIOS</span>
              <h2 id="titulo-meus-produtos">Produtos cadastrados</h2>
              <p>Gerencie os anúncios publicados pela sua conta.</p>
            </div>
            <RouterLink to="/cadastrarP" class="btn-novo-produto">Novo produto</RouterLink>
          </div>

          <div v-if="produtosDoUsuario.length" class="produtos-usuario-grid">
            <article v-for="produto in produtosDoUsuario" :key="produto.id" class="produto-gerenciavel">
              <ProdutoCard
                :id="produto.id"
                :titulo="produto.titulo"
                :descricao="produto.descricao"
                :imagem="produto.imagem"
                :preco="produto.preco"
                :status="produto.status"
                :categoria="produto.categoria"
              />
              <RouterLink
                :to="{ name: 'editarProduto', params: { id: produto.id } }"
                class="btn-editar-produto"
              >
                Editar informações
              </RouterLink>
            </article>
          </div>
          <div v-else class="produtos-vazio">
            <div class="caixa-vazia" aria-hidden="true">＋</div>
            <h3>Você ainda não publicou produtos</h3>
            <p>Crie seu primeiro anúncio para começar a vender ou trocar na TradeHub.</p>
            <RouterLink to="/cadastrarP" class="btn-novo-produto">Cadastrar produto</RouterLink>
          </div>
        </section>

        <section id="favoritos" class="favoritos" aria-labelledby="titulo-favoritos">
          <div class="favoritos-cabecalho">
            <div>
              <span class="secao-etiqueta">MINHA LISTA</span>
              <h2 id="titulo-favoritos">Produtos favoritos</h2>
              <p>Itens que você guardou para consultar depois.</p>
            </div>
            <span class="favoritos-contador">
              {{ produtosFavoritos.length }}
              {{ produtosFavoritos.length === 1 ? 'item' : 'itens' }}
            </span>
          </div>

          <div v-if="produtosFavoritos.length" class="favoritos-grid">
            <ProdutoCard
              v-for="produto in produtosFavoritos"
              :key="produto.id"
              :id="produto.id"
              :titulo="produto.titulo"
              :descricao="produto.descricao"
              :imagem="produto.imagem"
              :preco="produto.preco"
              :status="produto.status"
              :categoria="produto.categoria"
            />
          </div>

          <div v-else class="favoritos-vazio">
            <div class="coracao-vazio" aria-hidden="true">♡</div>
            <h3>Sua lista de favoritos está vazia</h3>
            <p>Salve os produtos de que mais gostou para encontrá-los rapidamente aqui.</p>
            <RouterLink to="/" class="btn-explorar">Explorar produtos</RouterLink>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { quantidadeUsuariosCadastrados, usuarioAtual } from '@/data/auth.js'
import { produtosFavoritos } from '@/data/favoritos.js'
import { associarProdutosSemDono, listaProdutos } from '@/data/produtos.js'
import {
  alterarEnderecoPedido,
  excluirPedido,
  pedidosDoUsuario as buscarPedidosDoUsuario,
} from '@/data/pedidos.js'
import ProdutoCard from '@/components/ProdutoCard.vue'

const mensagemPedidos = ref('')
const erroPedidos = ref('')
const pedidoEmAlteracao = ref('')
const pedidoParaExcluir = ref('')
const enderecoSolicitado = ref({})
const etapasPedido = ['Pedido confirmado', 'Em preparação', 'Em transporte', 'Entregue']

if (usuarioAtual.value && quantidadeUsuariosCadastrados() === 1) {
  try {
    associarProdutosSemDono(usuarioAtual.value)
  } catch {
    // O perfil continua disponível mesmo se a migração de anúncios antigos falhar.
  }
}

const produtosDoUsuario = computed(() => {
  if (!usuarioAtual.value?.id) return []

  return listaProdutos.filter(
    (produto) => String(produto.vendedorId) === String(usuarioAtual.value.id),
  )
})

const pedidosDoUsuario = computed(() => buscarPedidosDoUsuario(usuarioAtual.value?.id))

function formatarData(data) {
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(new Date(data))
}

function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
}

function formatarEndereco(endereco) {
  return [
    `${endereco.rua}, ${endereco.numero}`,
    endereco.complemento,
    endereco.bairro,
    `${endereco.cidade} - ${endereco.estado}`,
    `CEP ${endereco.cep}`,
  ]
    .filter(Boolean)
    .join(' · ')
}

function classeStatus(status) {
  return {
    'pedido-status--cancelado': status === 'Cancelado',
    'pedido-status--entregue': status === 'Entregue',
  }
}

function iniciarAlteracaoEndereco(pedido) {
  erroPedidos.value = ''
  mensagemPedidos.value = ''
  pedidoParaExcluir.value = ''
  pedidoEmAlteracao.value = pedido.id
  enderecoSolicitado.value = { ...pedido.endereco }
}

function salvarEnderecoPedido(pedidoId) {
  try {
    alterarEnderecoPedido(pedidoId, usuarioAtual.value.id, enderecoSolicitado.value)
    pedidoEmAlteracao.value = ''
    mensagemPedidos.value = 'Endereço de entrega atualizado com sucesso.'
    erroPedidos.value = ''
  } catch (erro) {
    erroPedidos.value =
      erro instanceof Error ? erro.message : 'Não foi possível atualizar o endereço de entrega.'
    mensagemPedidos.value = ''
  }
}

function alternarConfirmacaoExclusao(pedidoId) {
  if (pedidoParaExcluir.value !== pedidoId) {
    pedidoParaExcluir.value = pedidoId
    pedidoEmAlteracao.value = ''
    mensagemPedidos.value = ''
    erroPedidos.value = ''
    return
  }

  try {
    excluirPedido(pedidoId, usuarioAtual.value.id)
    pedidoParaExcluir.value = ''
    mensagemPedidos.value = 'Pedido excluído.'
    erroPedidos.value = ''
  } catch (erro) {
    pedidoParaExcluir.value = ''
    erroPedidos.value =
      erro instanceof Error ? erro.message : 'Não foi possível cancelar o pedido.'
    mensagemPedidos.value = ''
  }
}
</script>

<style scoped>
.pagina-usuario {
  --azul: #185aee;
  --azul-escuro: #0f4dcc;
  --azul-suave: #edf3ff;
  --texto: #17253d;
  --texto-suave: #66758c;
  --borda: #dde5f0;

  width: min(calc(100% - 48px), 1180px);
  margin: -168px auto 80px;
  position: relative;
  z-index: 5;
  color: var(--texto);
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 18px;
  color: rgba(255, 255, 255, 0.76);
  font-size: 0.82rem;
  font-weight: 600;
}

.breadcrumb a {
  color: #ffffff;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.cabecalho-pagina {
  margin-bottom: 28px;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(12, 49, 130, 0.18);
}

.cabecalho-etiqueta {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.cabecalho-pagina h1 {
  margin: 7px 0 6px;
  font-size: clamp(2rem, 4vw, 2.65rem);
  letter-spacing: -0.035em;
  line-height: 1.08;
}

.cabecalho-pagina p {
  margin: 0;
  color: rgba(255, 255, 255, 0.84);
  line-height: 1.5;
}

.painel-conta {
  display: grid;
  grid-template-columns: 278px minmax(0, 1fr);
  align-items: start;
  gap: 24px;
}

.coluna-perfil {
  display: grid;
  gap: 18px;
}

.resumo-perfil,
.menu-conta,
.pedidos,
.pedidos,
.dados-conta,
.produtos-usuario,
.favoritos {
  background: #ffffff;
  border: 1px solid var(--borda);
  border-radius: 16px;
  box-shadow: 0 8px 26px rgba(27, 51, 87, 0.07);
  box-sizing: border-box;
}

.resumo-perfil {
  padding: 28px 24px 24px;
  text-align: center;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin: 0 auto 17px;
  overflow: hidden;
  background: #edf3ff;
  border: 4px solid #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 0 2px #dbe6fa, 0 10px 24px rgba(24, 67, 142, 0.14);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.usuario {
  min-width: 0;
}

.status-conta {
  display: inline-block;
  margin-bottom: 10px;
  padding: 4px 9px;
  color: #14804a;
  background: #ecfdf3;
  border: 1px solid #c7f0d9;
  border-radius: 999px;
  font-size: 0.67rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.usuario h2 {
  margin: 0 0 6px;
  overflow: hidden;
  color: var(--texto);
  font-size: 1.25rem;
  font-weight: 750;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.usuario p {
  margin: 0;
  overflow: hidden;
  color: var(--texto-suave);
  font-size: 0.84rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-editar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 22px;
  padding: 11px 16px;
  color: var(--azul);
  background: #ffffff;
  border: 1px solid #aec5f4;
  border-radius: 9px;
  box-sizing: border-box;
  font-size: 0.86rem;
  font-weight: 700;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.btn-editar:hover {
  color: var(--azul-escuro);
  background: var(--azul-suave);
  border-color: var(--azul);
}

.btn-editar:focus-visible {
  outline: 3px solid rgba(24, 90, 238, 0.25);
  outline-offset: 3px;
}

.menu-conta {
  padding: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 11px;
  min-height: 46px;
  padding: 0 12px;
  color: #52627a;
  border-radius: 9px;
  font-size: 0.88rem;
  font-weight: 650;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.menu-item:hover,
.menu-item--ativo {
  color: var(--azul);
  background: var(--azul-suave);
}

.menu-item svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.menu-item strong {
  min-width: 25px;
  margin-left: auto;
  padding: 3px 6px;
  color: var(--azul);
  background: #ffffff;
  border: 1px solid #d9e4f7;
  border-radius: 999px;
  box-sizing: border-box;
  font-size: 0.7rem;
  text-align: center;
}

.conteudo-conta {
  display: grid;
  gap: 24px;
  min-width: 0;
}

.pedidos {
  padding: 28px 30px 30px;
}

.lista-pedidos {
  display: grid;
  gap: 16px;
  margin-top: 22px;
}

.pedido-card {
  padding: 20px;
  border: 1px solid var(--borda);
  border-radius: 12px;
}

.pedido-cabecalho,
.pedido-conteudo,
.pedido-produto,
.acoes-pedido {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.pedido-numero {
  color: var(--texto);
  font-weight: 800;
}

.pedido-cabecalho p {
  margin: 5px 0 0;
  color: var(--texto-suave);
  font-size: 0.8rem;
}

.pedido-status {
  padding: 6px 10px;
  color: #1558bd;
  background: #edf3ff;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 750;
  white-space: nowrap;
}

.pedido-status--cancelado {
  color: #a32121;
  background: #fff0f0;
}

.pedido-status--entregue {
  color: #14804a;
  background: #ecfdf3;
}

.rastreamento {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: 24px 0;
}

.etapa-rastreamento {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 8px;
  color: #8a96a8;
  font-size: 0.68rem;
  text-align: center;
}

.etapa-rastreamento::before {
  position: absolute;
  top: 6px;
  right: 50%;
  width: 100%;
  height: 2px;
  background: #e2e8f0;
  content: '';
}

.etapa-rastreamento:first-child::before {
  display: none;
}

.etapa-ponto {
  z-index: 1;
  width: 12px;
  height: 12px;
  background: #e2e8f0;
  border: 2px solid #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #e2e8f0;
}

.etapa-rastreamento.concluida {
  color: var(--azul);
  font-weight: 700;
}

.etapa-rastreamento.concluida .etapa-ponto,
.etapa-rastreamento.concluida::before {
  background: var(--azul);
}

.etapa-rastreamento.concluida .etapa-ponto {
  box-shadow: 0 0 0 1px var(--azul);
}

.pedido-conteudo {
  align-items: flex-start;
  padding: 16px 0;
  border-top: 1px solid #edf0f5;
  border-bottom: 1px solid #edf0f5;
}

.pedido-produtos,
.pedido-entrega {
  display: grid;
  flex: 1;
  gap: 10px;
  min-width: 0;
}

.pedido-produto {
  justify-content: flex-start;
}

.pedido-produto img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  background: #f3f6fb;
  border-radius: 7px;
}

.pedido-produto div {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.pedido-produto strong,
.pedido-entrega strong,
.form-endereco h3 {
  color: var(--texto);
  font-size: 0.83rem;
}

.pedido-produto span,
.pedido-entrega span {
  color: var(--texto-suave);
  font-size: 0.78rem;
  line-height: 1.45;
}

.pedido-entrega {
  max-width: 50%;
}

.form-endereco {
  padding: 16px 0 4px;
}

.form-endereco h3 {
  margin: 0 0 12px;
  color: var(--texto);
  font-size: 0.95rem;
}

.campos-pedido {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.campos-pedido label {
  display: grid;
  gap: 5px;
  color: var(--texto-suave);
  font-size: 0.75rem;
  font-weight: 700;
}

.campos-pedido input {
  width: 100%;
  min-width: 0;
  padding: 9px 10px;
  border: 1px solid var(--borda);
  border-radius: 7px;
  box-sizing: border-box;
  font: inherit;
}

.campo-pedido-largo {
  grid-column: 1 / -1;
}

.acoes-pedido {
  justify-content: flex-end;
  margin-top: 14px;
}

.acao-principal,
.acao-secundaria,
.acao-cancelar {
  padding: 9px 12px;
  border: 1px solid var(--azul);
  border-radius: 7px;
  cursor: pointer;
  font: inherit;
  font-size: 0.78rem;
  font-weight: 700;
}

.acao-principal {
  color: #fff;
  background: var(--azul);
}

.acao-secundaria {
  color: var(--azul);
  background: #fff;
}

.acao-cancelar {
  color: #b42323;
  background: #fff;
  border-color: #efcaca;
}

.acao-principal:hover {
  background: var(--azul-escuro);
}

.acao-secundaria:hover {
  background: var(--azul-suave);
}

.acao-cancelar:hover {
  background: #fff0f0;
}

.acao-cancelar--confirmar {
  color: #ffffff;
  background: #b42323;
  border-color: #b42323;
}

.acao-cancelar--confirmar:hover {
  background: #8f1919;
}

.mensagem-pedido,
.erro-pedido {
  padding: 10px 12px;
  margin: 16px 0 0;
  border-radius: 7px;
  font-size: 0.82rem;
}

.mensagem-pedido {
  color: #155f39;
  background: #ecfdf3;
}

.erro-pedido {
  color: #a32121;
  background: #fff0f0;
}

.pedidos-vazio {
  margin-top: 20px;
  padding: 28px 18px;
  background: #fafcff;
  border: 1px dashed #c7d5e8;
  border-radius: 12px;
  text-align: center;
}

.pedidos-vazio > div {
  margin-bottom: 8px;
  font-size: 1.8rem;
}

.pedidos-vazio h3 {
  margin: 0 0 8px;
  color: var(--texto);
  font-size: 1rem;
}

.pedidos-vazio p {
  max-width: 420px;
  margin: 0 auto;
  color: var(--texto-suave);
  font-size: 0.85rem;
  line-height: 1.5;
}

.pedidos-vazio .btn-explorar {
  margin-top: 15px;
}

.dados-conta,
.produtos-usuario,
.favoritos {
  padding: 28px 30px 30px;
}

.secao-cabecalho,
.favoritos-cabecalho {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--borda);
}

.secao-etiqueta {
  color: var(--azul);
  font-size: 0.67rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.secao-cabecalho h2,
.favoritos-cabecalho h2 {
  margin: 7px 0 5px;
  color: var(--texto);
  font-size: 1.35rem;
  letter-spacing: -0.018em;
}

.secao-cabecalho p,
.favoritos-cabecalho p {
  margin: 0;
  color: var(--texto-suave);
  font-size: 0.9rem;
  line-height: 1.5;
}

.editar-link {
  flex-shrink: 0;
  color: var(--azul);
  font-size: 0.83rem;
  font-weight: 700;
  text-decoration: none;
}

.editar-link:hover {
  text-decoration: underline;
}

.btn-novo-produto,
.btn-editar-produto {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: var(--azul);
  border: 1px solid var(--azul);
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.btn-novo-produto {
  flex-shrink: 0;
  padding: 10px 15px;
}

.btn-novo-produto:hover,
.btn-editar-produto:hover {
  background: var(--azul-escuro);
  border-color: var(--azul-escuro);
}

.informacoes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
  padding: 15px 17px;
  background: #f8fafc;
  border: 1px solid #e4eaf2;
  border-radius: 10px;
}

.info-item:first-child {
  grid-column: 1 / -1;
}

.label {
  color: #7a879a;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.055em;
  text-transform: uppercase;
}

.valor {
  overflow: hidden;
  color: #26364f;
  font-size: 0.94rem;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.produtos-usuario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.produto-gerenciavel {
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e1e7ef;
  border-radius: 12px;
}

.produto-gerenciavel :deep(.produto-card) {
  max-width: none;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

.btn-editar-produto {
  margin: auto 14px 14px;
  padding: 10px 14px;
}

.produtos-vazio {
  margin-top: 24px;
  padding: 36px 24px;
  background: #fafcff;
  border: 1px dashed #c7d5e8;
  border-radius: 12px;
  text-align: center;
}

.caixa-vazia {
  display: grid;
  width: 52px;
  height: 52px;
  margin: 0 auto 15px;
  color: var(--azul);
  background: var(--azul-suave);
  border-radius: 12px;
  place-items: center;
  font-size: 1.8rem;
}

.produtos-vazio h3 {
  margin: 0 0 8px;
  color: var(--texto);
  font-size: 1.12rem;
}

.produtos-vazio p {
  max-width: 480px;
  margin: 0 auto 19px;
  color: var(--texto-suave);
  font-size: 0.9rem;
  line-height: 1.55;
}

.favoritos-cabecalho {
  align-items: flex-end;
}

.favoritos-contador {
  flex-shrink: 0;
  min-width: 58px;
  padding: 7px 11px;
  color: var(--azul);
  background: var(--azul-suave);
  border: 1px solid #d9e6ff;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 800;
  text-align: center;
}

.favoritos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.favoritos-grid :deep(.produto-card) {
  max-width: none;
  border-color: #e1e7ef;
  border-radius: 12px;
  box-shadow: none;
}

.favoritos-vazio {
  margin-top: 24px;
  padding: 42px 24px;
  background: #fafcff;
  border: 1px dashed #c7d5e8;
  border-radius: 12px;
  text-align: center;
}

.coracao-vazio {
  display: grid;
  width: 58px;
  height: 58px;
  margin: 0 auto 17px;
  color: var(--azul);
  background: var(--azul-suave);
  border: 1px solid #d6e3fa;
  border-radius: 50%;
  place-items: center;
  font-size: 1.95rem;
}

.favoritos-vazio h3 {
  margin: 0 0 8px;
  color: var(--texto);
  font-size: 1.15rem;
}

.favoritos-vazio p {
  max-width: 480px;
  margin: 0 auto;
  color: var(--texto-suave);
  font-size: 0.9rem;
  line-height: 1.55;
}

.btn-explorar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 11px 18px;
  color: #ffffff;
  background: var(--azul);
  border-radius: 8px;
  box-shadow: 0 7px 16px rgba(24, 90, 238, 0.2);
  font-size: 0.86rem;
  font-weight: 700;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.btn-explorar:hover {
  background: var(--azul-escuro);
  box-shadow: 0 9px 20px rgba(24, 90, 238, 0.26);
  transform: translateY(-1px);
}

.btn-explorar:focus-visible {
  outline: 3px solid rgba(24, 90, 238, 0.3);
  outline-offset: 3px;
}

@media (max-width: 900px) {
  .pagina-usuario {
    width: calc(100% - 32px);
    margin-bottom: 60px;
  }

  .painel-conta {
    grid-template-columns: 230px minmax(0, 1fr);
  }

  .dados-conta,
  .produtos-usuario,
  .favoritos {
    padding: 25px;
  }

  .informacoes {
    grid-template-columns: 1fr;
  }

  .info-item:first-child {
    grid-column: auto;
  }
}

@media (max-width: 720px) {
  .pagina-usuario {
    margin-top: -154px;
  }

  .painel-conta {
    grid-template-columns: 1fr;
  }

  .resumo-perfil {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 17px;
    padding: 22px;
    text-align: left;
  }

  .avatar {
    width: 76px;
    height: 76px;
    margin: 0;
  }

  .status-conta {
    margin-bottom: 7px;
  }

  .usuario h2 {
    font-size: 1.1rem;
  }

  .btn-editar {
    width: auto;
    margin: 0;
  }

  .menu-conta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }

  .pedido-conteudo {
    flex-direction: column;
  }

  .pedido-entrega {
    max-width: none;
  }
}

@media (max-width: 520px) {
  .pagina-usuario {
    width: calc(100% - 24px);
    margin-top: -170px;
    margin-bottom: 48px;
  }

  .breadcrumb {
    margin-bottom: 13px;
  }

  .cabecalho-pagina {
    margin-bottom: 22px;
  }

  .cabecalho-pagina h1 {
    font-size: 1.9rem;
  }

  .cabecalho-pagina p {
    max-width: 290px;
    font-size: 0.88rem;
  }

  .resumo-perfil {
    grid-template-columns: auto minmax(0, 1fr);
    padding: 20px;
  }

  .btn-editar {
    grid-column: 1 / -1;
    width: 100%;
    margin-top: 2px;
  }

  .pedidos,
  .dados-conta,
  .produtos-usuario,
  .favoritos {
    padding: 22px 18px;
  }

  .secao-cabecalho,
  .favoritos-cabecalho {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }

  .informacoes {
    gap: 11px;
    margin-top: 20px;
  }

  .pedido-card {
    padding: 16px;
  }

  .etapa-rastreamento {
    font-size: 0.58rem;
  }

  .pedido-cabecalho {
    align-items: flex-start;
  }

  .pedido-status {
    text-align: center;
  }

  .acoes-pedido {
    align-items: stretch;
    flex-direction: column;
  }

  .favoritos-cabecalho {
    padding-bottom: 20px;
  }

  .favoritos-contador {
    min-width: 0;
  }

  .favoritos-grid {
    grid-template-columns: 1fr;
    gap: 18px;
    margin-top: 20px;
  }

  .favoritos-vazio {
    margin-top: 20px;
    padding: 34px 16px;
  }

  .produtos-cabecalho {
    align-items: stretch;
  }

  .produtos-usuario-grid {
    grid-template-columns: 1fr;
    margin-top: 20px;
  }

  .btn-novo-produto {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn-editar,
  .menu-item,
  .btn-novo-produto,
  .btn-editar-produto,
  .btn-explorar {
    transition: none;
  }
}
</style>
