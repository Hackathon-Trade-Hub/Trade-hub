<template>
    <section class="comprar-page">
        <header class="comprar-cabecalho">
          <span class="etiqueta">COMPRAR</span>
          <h1>Produtos disponíveis para compra</h1>
          <p>Encontre produtos anunciados para venda na TradeHub.</p>
          <span class="contador">
            {{ produtosFiltrados.length }}
            {{ produtosFiltrados.length === 1 ? 'produto encontrado' : 'produtos encontrados' }}
          </span>
        </header>

        <div class="grid-produtos" v-if="produtosFiltrados.length">
            <ProdutoCard v-for="produto in produtosFiltrados" :key="produto.id" :id="produto.id" :titulo="produto.titulo" :descricao="produto.descricao" :imagem="produto.imagem" :preco="produto.preco" :status="produto.status"/>
        </div>

        <div v-else class="estado-vazio">
          <div class="icone-vazio" aria-hidden="true">$</div>
          <h2>Nenhum produto encontrado</h2>
          <p>Não encontramos anúncios de venda que correspondam à sua busca.</p>
          <RouterLink to="/" class="botao-voltar">Voltar para o início</RouterLink>
        </div>
    </section>
</template>

<script setup>

import { computed } from 'vue';
import ProdutoCard from '@/components/ProdutoCard.vue';
import { listaProdutos } from '@/data/produtos';
import { termoBusca } from '@/components/Filter.vue';

defineOptions({ name: 'ComprarProdutos' })

const produtosFiltrados = computed(() => {
    return listaProdutos.filter((produto) => {
        const disponivelParaVenda = produto.status.includes('Venda')

        const buscaOk = termoBusca.value ? produto.titulo.toLowerCase().includes(termoBusca.value.toLowerCase()) :true

        return disponivelParaVenda && buscaOk
    })
})
</script>

<style scoped>
.comprar-page {
  min-height: 100vh;
  padding: 48px 24px 80px;
  background: #f7f9fc;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.comprar-cabecalho {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #dce4ef;
}

.etiqueta {
  color: #185aee;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.09em;
}

.comprar-cabecalho h1 {
  margin: 8px 0 8px;
  color: #172a45;
  font-size: clamp(1.8rem, 4vw, 2.55rem);
  line-height: 1.16;
  letter-spacing: -0.025em;
}

.comprar-cabecalho p {
  margin: 0;
  color: #607088;
  font-size: 1rem;
  line-height: 1.55;
}

.contador {
  display: inline-flex;
  margin-top: 14px;
  padding: 6px 10px;
  color: #185aee;
  background: #eaf1ff;
  border-radius: 7px;
  font-size: 0.8rem;
  font-weight: 700;
}

.grid-produtos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 280px));
  justify-content: start;
  gap: 24px;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  align-items: stretch;
}

.grid-produtos :deep(.produto-card) {
  width: 100%;
  max-width: 280px;
  height: 440px;
  margin: 0;
  border-width: 1px;
  border-radius: 18px;
  box-shadow: 0 8px 22px rgba(32, 62, 106, 0.09);
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.grid-produtos :deep(.produto-card:hover) {
  box-shadow: 0 12px 28px rgba(32, 62, 106, 0.14);
}

.estado-vazio {
  width: min(100%, 520px);
  margin: 46px auto 0;
  padding: 40px 28px;
  text-align: center;
  background: #ffffff;
  border: 1px solid #dce4ef;
  border-radius: 16px;
  box-sizing: border-box;
}

.icone-vazio {
  display: grid;
  width: 54px;
  height: 54px;
  margin: 0 auto 18px;
  color: #185aee;
  background: #eaf1ff;
  border-radius: 50%;
  place-items: center;
  font-size: 1.35rem;
  font-weight: 800;
}

.estado-vazio h2 {
  margin: 0 0 8px;
  color: #172a45;
  font-size: 1.45rem;
}

.estado-vazio p {
  margin: 0;
  color: #66768c;
  line-height: 1.55;
}

.botao-voltar {
  display: inline-block;
  margin-top: 22px;
  padding: 11px 18px;
  color: #ffffff;
  background: #185aee;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.botao-voltar:hover {
  background: #0f4dcc;
  transform: translateY(-1px);
}

@media (max-width: 680px) {
  .comprar-page {
    padding: 36px 16px 64px;
  }

  .comprar-cabecalho {
    margin-bottom: 26px;
  }

  .grid-produtos {
    grid-template-columns: minmax(0, 340px);
    justify-content: center;
    gap: 20px;
  }

  .grid-produtos :deep(.produto-card) {
    max-width: 340px;
    height: 420px;
  }

  .estado-vazio {
    margin-top: 28px;
    padding: 34px 22px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .grid-produtos :deep(.produto-card),
  .botao-voltar {
    transition: none;
  }
}
</style>
