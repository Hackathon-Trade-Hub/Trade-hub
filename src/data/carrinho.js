import { computed, ref } from 'vue'

const CARRINHO_KEY = 'tradehub:carrinho'

function parsePreco(preco) {
  if (typeof preco === 'number') return Number.isFinite(preco) ? preco : 0

  const valor = Number(
    String(preco ?? '')
      .replace('R$', '')
      .trim()
      .replaceAll('.', '')
      .replace(',', '.'),
  )

  return Number.isFinite(valor) ? valor : 0
}

function lerCarrinho() {
  if (typeof localStorage === 'undefined') return []

  try {
    const dados = JSON.parse(localStorage.getItem(CARRINHO_KEY) || '[]')
    if (!Array.isArray(dados)) return []

    return dados
      .filter((item) => item && item.id !== undefined)
      .map((item) => ({
        ...item,
        preco: parsePreco(item.preco),
        quantidade: Math.max(1, Number(item.quantidade) || 1),
      }))
  } catch {
    return []
  }
}

function salvarCarrinho() {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(CARRINHO_KEY, JSON.stringify(carrinho.value))
}

export const carrinho = ref(lerCarrinho())

export function adicionarAoCarrinho(produto) {
  const itemExistente = carrinho.value.find((item) => item.id === produto.id)

  if (itemExistente) {
    itemExistente.quantidade += 1
    salvarCarrinho()
    return
  }

  carrinho.value.push({
    ...produto,
    preco: parsePreco(produto.preco),
    quantidade: 1,
  })
  salvarCarrinho()
}

export function removerDoCarrinho(id) {
  const index = carrinho.value.findIndex((item) => item.id === id)
  if (index !== -1) carrinho.value.splice(index, 1)
  salvarCarrinho()
}

export function aumentarQuantidade(id) {
  const item = carrinho.value.find((item) => item.id === id)
  if (item) item.quantidade += 1
  salvarCarrinho()
}

export function diminuirQuantidade(id) {
  const item = carrinho.value.find((item) => item.id === id)
  if (!item) return

  item.quantidade -= 1
  if (item.quantidade <= 0) {
    removerDoCarrinho(id)
  } else {
    salvarCarrinho()
  }
}

export function limparCarrinho() {
  carrinho.value = []
  salvarCarrinho()
}

export const quantidadeTotal = computed(() =>
  carrinho.value.reduce((soma, item) => soma + item.quantidade, 0)
)

export const totalCarrinho = computed(() =>
  carrinho.value.reduce((soma, item) => soma + item.preco * item.quantidade, 0)
)
export function finalizarCompra() {
    const total = totalCarrinho.value.toFixed(2).replace('.', ',')
    window.alert(`Compra finalizada com sucesso! Total: R$ ${total}`)
    limparCarrinho()
}
