<template>

</template>

<script setup>
import { ref, computed } from 'vue';
import ProdutoCard from './ProdutoCard.vue';

const filtro = ref('')

const produtosFiltrados = computed(() => {
    if (filtro.value.trim() == '') {
        return ProdutoCard.value;
    }
    else {
        return ProdutoCard.value.filter(p => p.titulo.includes(filtro.value))
    }
})

</script>

<style scoped>

</style>