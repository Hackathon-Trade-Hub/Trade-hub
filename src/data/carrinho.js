import { computed, ref, watch } from 'vue'
import { usuarioAtual } from './auth.js'
import { listaProdutos } from './produtos.js'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const CARRINHO_URL = `${API_URL}/carrinho`
const JSON_HEADERS = { 'Content-Type': 'application/json' }

const itens = ref([])

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

async function requisitar(url, opcoes) {
  const resposta = await fetch(url, opcoes)
  if (!resposta.ok) throw new Error(`Erro na API do carrinho (${resposta.status}).`)
  return resposta.status === 204 ? null : resposta.json()
}

function exigirUsuario() {
  const usuarioId = usuarioAtual.value?.id
  if (usuarioId === undefined || usuarioId === null) {
    throw new Error('Você precisa estar conectado para usar o carrinho.')
  }
  return String(usuarioId)
}

export const carrinho = computed(() =>
  itens.value
    .map((item) => {
      const produto = listaProdutos.find((p) => String(p.id) === String(item.produtoId))
      if (!produto) return null 

      return {
        ...produto,
        preco: parsePreco(produto.preco),
        carrinhoId: item.id,
        quantidade: Math.max(1, Number(item.quantidade) || 1),
      }
    })
    .filter(Boolean),
)

export async function carregarCarrinho() {
  const usuarioId = usuarioAtual.value?.id

  if (usuarioId === undefined || usuarioId === null) {
    itens.value = []
    return itens.value
  }

  try {
    itens.value = await requisitar(`${CARRINHO_URL}?usuarioId=${encodeURIComponent(usuarioId)}`)
  } catch (erro) {
    console.error('Não foi possível carregar o carrinho do JSON Server:', erro)
    itens.value = []
  }
  return itens.value
}

watch(() => usuarioAtual.value?.id, carregarCarrinho, { immediate: true })

export function buscarItemCarrinho(id) {
  return requisitar(`${CARRINHO_URL}/${id}`)
}

export async function alterarQuantidade(id, quantidade) {
  const novaQuantidade = Number(quantidade)
  if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
    throw new Error('A quantidade precisa ser um número inteiro maior que zero.')
  }

  const atual = await buscarItemCarrinho(id)
  const atualizado = await requisitar(`${CARRINHO_URL}/${id}`, {
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify({ ...atual, quantidade: novaQuantidade }),
  })

  itens.value = itens.value.map((item) => (String(item.id) === String(id) ? atualizado : item))
  return atualizado
}

export async function adicionarAoCarrinho(produto) {
  const usuarioId = exigirUsuario()
  const produtoId = String(produto.id)

  const existentes = await requisitar(
    `${CARRINHO_URL}?usuarioId=${encodeURIComponent(usuarioId)}&produtoId=${encodeURIComponent(produtoId)}`,
  )
  if (existentes.length > 0) {
    return alterarQuantidade(existentes[0].id, Number(existentes[0].quantidade) + 1)
  }

  const criado = await requisitar(CARRINHO_URL, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify({ usuarioId, produtoId, quantidade: 1 }),
  })
  itens.value.push(criado)
  return criado
}

export async function removerDoCarrinho(id) {
  await requisitar(`${CARRINHO_URL}/${id}`, { method: 'DELETE' })
  itens.value = itens.value.filter((item) => String(item.id) !== String(id))
}

export function aumentarQuantidade(id) {
  const item = itens.value.find((i) => String(i.id) === String(id))
  if (!item) return
  return alterarQuantidade(id, Number(item.quantidade) + 1)
}

export function diminuirQuantidade(id) {
  const item = itens.value.find((i) => String(i.id) === String(id))
  if (!item) return
  if (Number(item.quantidade) <= 1) return removerDoCarrinho(id)
  return alterarQuantidade(id, Number(item.quantidade) - 1)
}

export async function limparCarrinho() {
  await Promise.all(itens.value.map((item) => requisitar(`${CARRINHO_URL}/${item.id}`, { method: 'DELETE' })))
  itens.value = []
}

export const quantidadeTotal = computed(() =>
  carrinho.value.reduce((soma, item) => soma + item.quantidade, 0),
)

export const totalCarrinho = computed(() =>
  carrinho.value.reduce((soma, item) => soma + item.preco * item.quantidade, 0),
)

export function finalizarCompra() {
  return totalCarrinho.value
}