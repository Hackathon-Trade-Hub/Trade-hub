<template>
    <div class="comprar-page">
        <h1>Produtos disponíveis para compra</h1>

        <div class="grid-produtos" v-if="produtosFiltrados.length">
            <ProdutoCard v-for="produto in produtosFiltrados" :key="produto.id" :id="produto.id" :titulo="produto.titulo" :descricao="produto.descricao" :imagem="produto.imagem" :preco="produto.preco"/>
        </div>

        <p v-else class="sem-resultados">Nenhum produto encontrado.</p>
    </div>
</template>

<script setup>

import { computed } from 'vue';
import ProdutoCard from '@/components/ProdutoCard.vue';
import { listaProdutos } from '@/data/produtos';
import { termoBusca } from '@/components/Filter.vue';

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

.comprar-page h1 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
}

.grid-produtos {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.sem-resultados {
    text-align: center;
    color: #888;
    margin-top: 3rem;
}

</style>