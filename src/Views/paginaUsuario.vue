<template>
  <main v-if="usuarioAtual" class="pagina-usuario">
    <nav class="breadcrumb" aria-label="Navegação estrutural">
      <RouterLink to="/">Início</RouterLink>
      <span aria-hidden="true">/</span>
      <span>Minha conta</span>
    </nav>


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
import { computed } from 'vue'
import { quantidadeUsuariosCadastrados, usuarioAtual } from '@/data/auth.js'
import { produtosFavoritos } from '@/data/favoritos.js'
import { associarProdutosSemDono, listaProdutos } from '@/data/produtos.js'
import ProdutoCard from '@/components/ProdutoCard.vue'

if (usuarioAtual.value && quantidadeUsuariosCadastrados() === 1) {
  try {
    associarProdutosSemDono(usuarioAtual.value)
  } catch {
  }
}

const produtosDoUsuario = computed(() => {
  if (!usuarioAtual.value?.id) return []

  return listaProdutos.filter(
    (produto) => String(produto.vendedorId) === String(usuarioAtual.value.id),
  )
})
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
  margin: 40px auto 80px;
  color: var(--texto);
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 18px;
  color: var(--texto-suave);
  font-size: 0.82rem;
  font-weight: 600;
}

.breadcrumb a {
  color: var(--azul);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.cabecalho-pagina {
  margin-bottom: 28px;
  color: var(--texto);
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
  color: var(--texto-suave);
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
</style>
