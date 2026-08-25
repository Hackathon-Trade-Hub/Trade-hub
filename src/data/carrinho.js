import { computed, ref } from 'vue'

export const carrinho = ref([])

function parsePreco(preco) {
  if (typeof preco === 'number') return preco

  return Number(
    String(preco)
      .replace('R$', '')
      .trim()
      .replaceAll('.', '')
      .replace(',', '.')
  )
}

export function adicionarAoCarrinho(produto) {
  const itemExistente = carrinho.value.find((item) => item.id === produto.id)

  if (itemExistente) {
    itemExistente.quantidade += 1
    return
  }

  carrinho.value.push({
    ...produto,
    preco: parsePreco(produto.preco),
    quantidade: 1,
  })
}

export function removerDoCarrinho(id) {
  const index = carrinho.value.findIndex((item) => item.id === id)
  if (index !== -1) carrinho.value.splice(index, 1)
}

export function aumentarQuantidade(id) {
  const item = carrinho.value.find((item) => item.id === id)
  if (item) item.quantidade += 1
}

export function diminuirQuantidade(id) {
  const item = carrinho.value.find((item) => item.id === id)
  if (!item) return

  item.quantidade -= 1
  if (item.quantidade <= 0) removerDoCarrinho(id)
}

export function limparCarrinho() {
  carrinho.value = []
}

export const quantidadeTotal = computed(() =>
  carrinho.value.reduce((soma, item) => soma + item.quantidade, 0)
)

export const totalCarrinho = computed(() =>
  carrinho.value.reduce((soma, item) => soma + item.preco * item.quantidade, 0)
)
