<template>
    <div class="comprar-page">
        <div class="comprar-cabecalho">
        <h1>Produtos disponíveis para compra</h1>
        </div>

        <div class="grid-produtos" v-if="produtosFiltrados.length">
            <ProdutoCard v-for="produto in produtosFiltrados" :key="produto.id" :id="produto.id" :titulo="produto.titulo" :descricao="produto.descricao" :imagem="produto.imagem" :preco="produto.preco" :status="produto.status"/>
        </div>

        <p v-else class="sem-resultados">Nenhum produto encontrado.</p>
    </div>
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
    padding: 2vw 7vw;
}

.comprar-cabecalho {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;
}

.comprar-cabecalho h1 {
    margin: 0;
    font-family: sans-serif;
    font-size: 1.75rem;
    font-weight: 500;
}

.grid-produtos {
    padding: 24px 0 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
}

.sem-resultados {
    text-align: center;
    color: #888;
    margin-top: 3rem;
}

</style>
