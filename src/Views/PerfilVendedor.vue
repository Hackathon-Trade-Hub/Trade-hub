<template>
  <div v-if="perfil" class="perfil-vendedor">
    <div class="topo">
      <router-link to="/" class="voltar">← Voltar</router-link>
    </div>

    <h1>Perfil <span>Trader</span></h1>

    <div class="avatar">
      <img v-if="perfil.foto" :src="perfil.foto" :alt="`Foto de ${perfil.nome}`" />
    </div>
    <h2>{{ perfil.nome }}</h2>
    <p v-if="usuarioDoPerfil" class="desde">Vendedor na Trade<span>Hub</span></p>
    <p v-else class="desde">Na Trade<span>Hub</span> desde {{ perfil.desde }}</p>

    <div v-if="usuarioDoPerfil" class="estatisticas estatisticas--usuario">
      <div>
        <p class="numero">{{ produtosVendedor.length }}</p>
        <p>{{ produtosVendedor.length === 1 ? 'Anúncio ativo' : 'Anúncios ativos' }}</p>
      </div>
    </div>

    <div v-else class="estatisticas">
      <div>
        <p class="numero">{{ perfil.vendas }}</p>
        <p>Vendas</p>
      </div>
      <div>
        <p class="numero">{{ perfil.avaliacao }}</p>
        <p>Avaliação</p>
      </div>
    </div>

    <template v-if="!usuarioDoPerfil">
      <p class="envio-texto">Envio em uma média de</p>
      <p class="envio-valor">{{ perfil.envio }}</p>
    </template>

    <div v-if="produtosVendedor.length" class="produtos">
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

    <div v-else class="sem-produtos">
      <h3>Nenhum produto publicado</h3>
      <p>Este usuário ainda não possui anúncios ativos.</p>
    </div>
  </div>

  <div v-else class="perfil-nao-encontrado">
    <h1>Perfil não encontrado</h1>
    <p>Este usuário pode não estar mais disponível.</p>
    <RouterLink to="/">Voltar para o início</RouterLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { vendedor } from '@/data/vendedor.js'
import { listaProdutos } from '@/data/produtos'
import { buscarUsuarioPorId } from '@/data/auth.js'
import ProdutoCard from '@/components/ProdutoCard.vue'

const route = useRoute()

const usuarioDoPerfil = computed(() =>
  route.params.id ? buscarUsuarioPorId(route.params.id) : null,
)

const perfil = computed(() => {
  if (!route.params.id) return vendedor
  return usuarioDoPerfil.value
})

const produtosVendedor = computed(() => {
  if (route.params.id) {
    return listaProdutos.filter(
      (produto) => String(produto.vendedorId) === String(route.params.id),
    )
  }

  return listaProdutos.filter((produto) => vendedor.produtosIds.includes(produto.id))
})
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
  overflow: hidden;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
.estatisticas--usuario {
  gap: 0;
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
.voltar {
  display: inline-block;
  margin-bottom: 24px;
  color: #075ed9;
  font-weight: 600;
  text-decoration: none;
  font-size: 1.15vw;
}
.sem-produtos,
.perfil-nao-encontrado {
  max-width: 520px;
  margin: 36px auto;
  padding: 32px;
  color: #53657d;
  background: #f7faff;
  border: 1px solid #d9e5f7;
  border-radius: 16px;
  text-align: center;
}
.sem-produtos h3,
.perfil-nao-encontrado h1 {
  margin-top: 0;
  color: #172b4d;
}
.perfil-nao-encontrado a {
  color: #075ed9;
  font-weight: 700;
}
</style>
