import { ref } from 'vue'
import { usuarioAtual } from './auth.js'

const PROPOSTAS_KEY = 'tradehub:propostas'

function lerPropostas() {
  try {
    const propostas = JSON.parse(localStorage.getItem(PROPOSTAS_KEY) || '[]')
    return Array.isArray(propostas) ? propostas : []
  } catch {
    return []
  }
}

export const propostasTroca = ref(lerPropostas())

function salvarPropostas() {
  localStorage.setItem(PROPOSTAS_KEY, JSON.stringify(propostasTroca.value))
}

function criarId() {
  return crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`
}

export function registrarProposta({ produtoAlvoId, nomeProduto, descricao, fotos }) {
  const proposta = {
    id: criarId(),
    usuarioId: usuarioAtual.value?.id ?? null,
    produtoAlvoId,
    nomeProduto: nomeProduto.trim(),
    descricao: descricao.trim(),
    fotos: fotos.map((foto) => (typeof foto === 'string' ? foto : foto.name)),
    mensagens: [],
    status: 'aguardando',
    criadaEm: new Date().toISOString(),
  }

  propostasTroca.value.push(proposta)
  salvarPropostas()
  return proposta
}

export function adicionarMensagem(propostaId, { texto, tipo }) {
  const proposta = propostasTroca.value.find((item) => item.id === propostaId)
  if (!proposta) return null

  proposta.mensagens ??= []
  const mensagem = {
    id: criarId(),
    tipo,
    texto,
    horario: new Date().toISOString(),
  }
  proposta.mensagens.push(mensagem)
  salvarPropostas()
  return mensagem
}

export function atualizarStatusProposta(propostaId, status) {
  const proposta = propostasTroca.value.find((item) => item.id === propostaId)
  if (!proposta) return
  proposta.status = status
  salvarPropostas()
}
