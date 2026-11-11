import { ref } from 'vue'
import { usuarioAtual } from './auth.js'

const PROPOSTAS_URL = 'http://localhost:3000/propostas'

export const propostasTroca = ref([])

async function requisitar(url, opcoes = {}) {
  const resposta = await fetch(url, opcoes)

  if (!resposta) {
    throw new Error(`Erro na requisição: ${resposta.status}`)
  }

  if (resposta.status === 204) {
    return null
  }

  return resposta.json()
}

export async function carregarPropostas() {
  const propostas = await requisitar(PROPOSTAS_URL)

  propostasTroca.value.splice(
    0,
    propostasTroca.value.length,
    ...propostas
  )
}

export async function registrarProposta({
  produtoAlvoId,
  nomeProduto,
  descricao,
  fotos
}) {
  const proposta = {
      usuarioId: usuarioAtual.value?.id ?? null,
      produtoAlvoId,
      nomeProduto: nomeProduto.trim(),
      descricao: descricao.trim(),
      fotos: fotos.map((foto) =>
      typeof foto === 'string' ? foto: foto.name
    ),
    mensagens: [],
    status: 'aguardando',
    criadaEm: new Date().toISOString()
  }

  const propostraCriada = await requisitar(PROPOSTAS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(proposta)
  })

  propostasTroca.value.push(propostraCriada)

  return propostraCriada
}

export async function atualizarProposta(propostaId, dados) {
  const propostaAtualizada = await requisitar(
    `${PROPOSTAS_URL}/${propostaId}`,
    {
      method: 'PATH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    }
  )

  const indice = propostasTroca.value.findIndex(
    (item) => String(item.id) === String(propostaId)
  )

  if (indice !== -1) {
    propostasTroca.value[indice] = propostaAtualizada
  }

  return propostaAtualizada
}

export async function removerProposta(propostaId) {
  await requisitar(`${PROPOSTAS_URL}/${propostaId}`,{
    method: 'DELETE'
  })

  const indice = propostasTroca.value.findIndex(
    (item) => String(item.id) === String(propostaId)
  )

  if (indice !== -1) {
    propostasTroca.value.splice(indice, 1)
  }
}

export async function adicionarMensagem(propostaId, { texto, tipo }) {
  const proposta = propostasTroca.value.find(
    (item) => String(item.id) === String(propostaId)
  )

  if (!proposta) return null

  const mensagens = [
    ...(proposta.mensagens ?? []),
    {
      id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`,
      tipo,
      texto,
      horario: new Date().toISOString()
    }
  ]

  const propostaAtualizada = await atualizarProposta(
    propostaId,
    { mensagens }
  )

  return propostaAtualizada.mensagens[
    propostaAtualizada.mensagens.length - 1
  ]
}

export async function atualizarStatusProposta(propostaId, status) {
  return atualizarProposta(propostaId, {status})
}
