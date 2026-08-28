<template>
  <div class="perfil-vendedor">
    <div class="topo">
      <RouterLink to="/" class="logo">Trade<span>Hub</span></RouterLink>
    </div>

    <h1>Perfil <span>Trader</span></h1>

    <div class="avatar"></div>
    <h2>{{ vendedor.nome }}</h2>
    <p class="desde">Na Trade<span>Hub</span> desde {{ vendedor.desde }}</p>

    <div class="estatisticas">
      <div>
        <p class="numero">{{ vendedor.vendas }}</p>
        <p>Vendas</p>
      </div>
      <div>
        <p class="numero">{{ vendedor.avaliacao }}</p>
        <p>Avaliação</p>
      </div>
    </div>

    <p class="envio-texto">Envio em uma média de</p>
    <p class="envio-valor">{{ vendedor.envio }}</p>

    <div class="produtos">
      <ProdutoCard
        v-for="produto in produtosVendedor"
        :key="produto.id"
        :id="produto.id"
        :titulo="produto.titulo"
        :imagem="produto.imagem"
        :preco="produto.preco"
        :status="produto.status"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { vendedor } from '@/data/vendedor.js'
import { listaProdutos } from '@/data/produtos'
import ProdutoCard from '@/components/ProdutoCard.vue'

const produtosVendedor = computed(() =>
  listaProdutos.filter(produto => vendedor.produtosIds.includes(produto.id))
)
</script>

<style scoped>
.perfil-vendedor {
  text-align: center;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.topo {
  text-align: left;
}
.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
  text-decoration: none;
}
.logo span {
  color: #0066ff;
}
h1 span {
  color: #0066ff;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #d9d9d9;
  margin: 30px auto 10px;
}
.desde {
  color: #555;
}
.desde span {
  color: #0066ff;
}
.estatisticas {
  display: flex;
  justify-content: center;
  gap: 100px;
  margin: 30px 0;
}
.numero {
  color: #0066ff;
  font-size: 2rem;
  font-weight: 700;
  margin: 5px 0 0;
}
.envio-texto {
  font-weight: 700;
  margin-bottom: 5px;
}
.envio-valor {
  color: #0066ff;
  font-size: 2rem;
  font-weight: 700;
  margin-top: 0;
}
.produtos {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 30px;
}
</style>
