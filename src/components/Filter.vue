<script>
import { ref, computed } from 'vue';
import { listaProdutos } from '@/data/produtos';

export const termoBusca =ref('')

export const produtosFiltrados = computed(() =>
    listaProdutos.filter(produto =>
        produto.titulo.toLowerCase().includes(termoBusca.value.toLowerCase())
    )
)
</script>

<style scoped>

</style>