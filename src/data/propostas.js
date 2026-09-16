import { ref } from 'vue'
import { usuarioAtual } from './auth.js'

export const propostasTroca = ref([])

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
    fotos: [...fotos],
    criadaEm: new Date().toISOString(),
  }

  propostasTroca.value.push(proposta)
  return proposta
}
