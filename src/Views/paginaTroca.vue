<template>
  <section class="pagina-troca">
    <header class="cabecalho-troca">
      <span class="etiqueta">PRODUTOS DISPONÍVEIS PARA</span>
      <h1>Anúncios para Troca</h1>
      <p>Encontre produtos disponíveis para negociar na TradeHub.</p>
      <span class="contador">
        {{ produtosDaCategoria.length }}
        {{ produtosDaCategoria.length === 1 ? 'produto encontrado' : 'produtos encontrados' }}
      </span>
    </header>

    <div v-if="produtosDaCategoria.length" class="produtos">
      <ProdutoCard
        v-for="produto in produtosDaCategoria"
        :key="produto.id"
        :id="produto.id"
        :titulo="produto.titulo"
        :descricao="produto.descricao"
        :imagem="produto.imagem"
      />
    </div>

    <div v-else class="estado-vazio">
      <div class="icone-vazio" aria-hidden="true">⇄</div>
      <h2>Nenhum produto encontrado</h2>
      <p>Ainda não existem anúncios disponíveis para este tipo de negociação.</p>
      <RouterLink to="/" class="botao-voltar">Voltar para o início</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { listaProdutos } from '@/data/produtos'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import ProdutoCard from '@/components/ProdutoCard.vue'

const route = useRoute()

const produtosDaCategoria = computed(() => {
  return listaProdutos.filter((item) => item.status === route.params.status)
})
</script>

<style scoped>
.pagina-troca {
  min-height: 100vh;
  padding: 52px 24px 88px;
  background: linear-gradient(180deg, #eef5ff 0, #f8fbff 240px, #ffffff 520px);
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.cabecalho-troca {
  max-width: 1200px;
  margin: 0 auto 38px;
  text-align: center;
}

.etiqueta {
  display: inline-block;
  padding: 7px 13px;
  color: #075ed9;
  background: #dceaff;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.cabecalho-troca h1 {
  margin: 16px 0 10px;
  color: #10233e;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.15;
}

.cabecalho-troca p {
  margin: 0 auto;
  color: #5b6d85;
  font-size: 1.05rem;
}

.contador {
  display: block;
  margin-top: 16px;
  color: #344966;
  font-size: 0.9rem;
  font-weight: 600;
}

.produtos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 28px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  align-items: stretch;
  justify-items: center;
}

.produtos :deep(.produto-card) {
  width: 100%;
  max-width: 300px;
  height: 440px;
  margin: 0;
  border-width: 1px;
  box-shadow: 0 14px 32px rgba(24, 90, 238, 0.12);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.produtos :deep(.produto-card:hover) {
  transform: translateY(-5px);
  box-shadow: 0 20px 38px rgba(24, 90, 238, 0.2);
}

.estado-vazio {
  max-width: 560px;
  margin: 20px auto 0;
  padding: 48px 30px;
  text-align: center;
  background: #ffffff;
  border: 1px solid #d9e5f7;
  border-radius: 24px;
  box-shadow: 0 16px 38px rgba(12, 66, 145, 0.1);
}

.icone-vazio {
  display: grid;
  width: 64px;
  height: 64px;
  margin: 0 auto 18px;
  color: #075ed9;
  background: #e9f2ff;
  border-radius: 50%;
  place-items: center;
  font-size: 2rem;
  font-weight: 700;
}

.estado-vazio h2 {
  margin: 0 0 10px;
  color: #10233e;
  font-size: 1.5rem;
}

.estado-vazio p {
  margin: 0;
  color: #64748b;
  line-height: 1.6;
}

.botao-voltar {
  display: inline-block;
  margin-top: 24px;
  padding: 12px 22px;
  color: #ffffff;
  background: #185aee;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(24, 90, 238, 0.2);
  font-weight: 700;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.botao-voltar:hover {
  background: #064fcc;
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .pagina-troca {
    padding: 38px 16px 64px;
  }

  .cabecalho-troca {
    margin-bottom: 30px;
  }

  .produtos {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .produtos :deep(.produto-card) {
    max-width: 340px;
    height: 420px;
  }

  .estado-vazio {
    padding: 38px 22px;
  }
}
</style>
