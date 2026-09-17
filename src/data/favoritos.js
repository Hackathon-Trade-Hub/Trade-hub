import { computed, reactive } from 'vue'
import { usuarioAtual } from '@/data/auth.js'
import { listaProdutos } from '@/data/produtos.js'

const FAVORITOS_KEY = 'tradehub:favoritos'

function lerFavoritos() {
  if (typeof localStorage === 'undefined') return {}

  try {
    const favoritos = JSON.parse(localStorage.getItem(FAVORITOS_KEY) || '{}')
    return favoritos && typeof favoritos === 'object' && !Array.isArray(favoritos) ? favoritos : {}
  } catch {
    return {}
  }
}

function salvarFavoritos(favoritos) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos))
}

const favoritosPorUsuario = reactive(lerFavoritos())

export const idsFavoritos = computed(() => {
  const usuarioId = usuarioAtual.value?.id
  if (!usuarioId) return []

  const favoritos = favoritosPorUsuario[usuarioId]
  return Array.isArray(favoritos) ? favoritos : []
})

export const produtosFavoritos = computed(() => {
  const ids = new Set(idsFavoritos.value.map(String))
  return listaProdutos.filter((produto) => ids.has(String(produto.id)))
})

export function produtoEstaNosFavoritos(produtoId) {
  return idsFavoritos.value.some((id) => String(id) === String(produtoId))
}

export function alternarFavorito(produtoId) {
  const usuarioId = usuarioAtual.value?.id

  if (!usuarioId) {
    throw new Error('Você precisa entrar na sua conta para favoritar produtos.')
  }

  const idNormalizado = String(produtoId)
  const favoritosAnteriores = [...idsFavoritos.value]
  const jaFavorito = favoritosAnteriores.some((id) => String(id) === idNormalizado)

  favoritosPorUsuario[usuarioId] = jaFavorito
    ? favoritosAnteriores.filter((id) => String(id) !== idNormalizado)
    : [...favoritosAnteriores, produtoId]

  try {
    salvarFavoritos(favoritosPorUsuario)
  } catch (erro) {
    favoritosPorUsuario[usuarioId] = favoritosAnteriores
    throw erro
  }

  return !jaFavorito
}
