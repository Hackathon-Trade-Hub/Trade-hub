import { computed, ref, watch } from 'vue'
import { usuarioAtual } from '@/data/auth.js'
import { listaProdutos } from '@/data/produtos.js'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const FAVORITOS_URL = `${API_URL}/favoritos`
const JSON_HEADERS = { 'Content-Type': 'application/json' }

export const PRIORIDADES = ['Alta', 'Média', 'Baixa']

export const listaFavoritos = ref([])
export const carregandoFavoritos = ref(false)
export const erroFavoritos = ref('')

async function requisitar(url, opcoes) {
  let resposta

  try {
    resposta = await fetch(url, opcoes)
  } catch {
    throw new Error('Não foi possível conectar à API. Veja se ela está ligada.')
  }

  if (!resposta.ok) {
    const erro = new Error('Erro na API de favoritos (' + resposta.status + ').')
    erro.status = resposta.status
    throw erro
  }

  if (resposta.status === 204) return null
  return resposta.json()
}

function esquecerFavorito(id) {
  listaFavoritos.value = listaFavoritos.value.filter((f) => String(f.id) !== String(id))
}

async function requisitarFavorito(id, opcoes) {
  try {
    return await requisitar(FAVORITOS_URL + '/' + id, opcoes)
  } catch (erro) {
    if (erro.status === 404) {
      esquecerFavorito(id)
      throw new Error('Este favorito não foi encontrado. A lista foi atualizada.', {
  cause: erro,
  })
    }
    throw erro
  }
}

function pegarUsuarioId() {
  const usuarioId = usuarioAtual.value?.id
  if (usuarioId === undefined || usuarioId === null) {
    throw new Error('Você precisa entrar na sua conta para favoritar produtos.')
  }
  return String(usuarioId)
}

export function classePrioridade(prioridade) {
  if (prioridade === 'Alta') return 'alta'
  if (prioridade === 'Baixa') return 'baixa'
  return 'media'
}

export const produtosFavoritos = computed(() => {
  const lista = []
  for (const favorito of listaFavoritos.value) {
    const produto = listaProdutos.find((p) => String(p.id) === String(favorito.produtoId))
    if (produto) {
      lista.push({
        ...produto,
        favoritoId: favorito.id,
        observacao: favorito.observacao,
        prioridade: favorito.prioridade || 'Média',
      })
    }
  }
  lista.sort((a, b) => PRIORIDADES.indexOf(a.prioridade) - PRIORIDADES.indexOf(b.prioridade))
  return lista
})

export async function carregarFavoritos() {
  const usuarioId = usuarioAtual.value?.id

  if (usuarioId === undefined || usuarioId === null) {
    listaFavoritos.value = []
    erroFavoritos.value = ''
    return
  }

  carregandoFavoritos.value = true
  erroFavoritos.value = ''

  try {
    listaFavoritos.value = await requisitar(FAVORITOS_URL + '?usuarioId=' + usuarioId)
  } catch (erro) {
    console.error(erro)
    listaFavoritos.value = []
    erroFavoritos.value = 'Não foi possível carregar seus favoritos. Veja se a API está ligada.'
  }

  carregandoFavoritos.value = false
}

watch(() => usuarioAtual.value?.id, carregarFavoritos, { immediate: true })

export function buscarFavorito(id) {
  return requisitarFavorito(id)
}

export function buscarFavoritoDoProduto(produtoId) {
  return listaFavoritos.value.find((f) => String(f.produtoId) === String(produtoId))
}

export function produtoEstaNosFavoritos(produtoId) {
  return buscarFavoritoDoProduto(produtoId) !== undefined
}

export async function adicionarFavorito(produtoId, prioridade = 'Média') {
  const usuarioId = pegarUsuarioId()

  if (!PRIORIDADES.includes(prioridade)) {
    throw new Error('Escolha uma prioridade válida.')
  }

  const produtoExiste = listaProdutos.some((p) => String(p.id) === String(produtoId))
  if (!produtoExiste) {
    throw new Error('Produto não encontrado.')
  }

  if (produtoEstaNosFavoritos(produtoId)) {
    throw new Error('Este produto já está nos seus favoritos.')
  }

  const novoFavorito = {
    usuarioId: usuarioId,
    produtoId: String(produtoId),
    prioridade: prioridade,
    observacao: '',
    criadoEm: new Date().toISOString(),
  }

  const criado = await requisitar(FAVORITOS_URL, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(novoFavorito),
  })

  listaFavoritos.value.push(criado)
  return criado
}

export async function atualizarFavorito(id, observacao, prioridade) {
  if (observacao.length > 200) {
    throw new Error('A anotação pode ter no máximo 200 caracteres.')
  }

  if (!PRIORIDADES.includes(prioridade)) {
    throw new Error('Escolha uma prioridade válida.')
  }

  const atualizado = await requisitarFavorito(id, {
    method: 'PATCH',
    headers: JSON_HEADERS,
    body: JSON.stringify({ observacao: observacao.trim(), prioridade: prioridade }),
  })

  listaFavoritos.value = listaFavoritos.value.map((f) =>
    String(f.id) === String(id) ? atualizado : f,
  )
  return atualizado
}

export async function removerFavorito(id) {
  await requisitarFavorito(id, { method: 'DELETE' })
  esquecerFavorito(id)
}

export async function alternarFavorito(produtoId, prioridade) {
  const favorito = buscarFavoritoDoProduto(produtoId)

  if (favorito) {
    await removerFavorito(favorito.id)
    return false
  }

  await adicionarFavorito(produtoId, prioridade)
  return true
}
