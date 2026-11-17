import { ref } from 'vue'

const PEDIDOS_KEY = 'tradehub:pedidos'

export const transportadorasDisponiveis = [
  {
    id: 'tradehub-expresso',
    nome: 'TradeHub Expresso',
    descricao: 'Mais rápido, com rastreamento prioritário',
    valorFrete: 24.9,
    prazoMinimoDias: 2,
    prazoMaximoDias: 4,
  },
  {
    id: 'rota-verde',
    nome: 'Rota Verde',
    descricao: 'Entrega econômica com menor impacto',
    valorFrete: 14.9,
    prazoMinimoDias: 5,
    prazoMaximoDias: 8,
  },
  {
    id: 'correios',
    nome: 'Correios — PAC',
    descricao: 'Cobertura nacional e entrega confiável',
    valorFrete: 19.9,
    prazoMinimoDias: 4,
    prazoMaximoDias: 7,
  },
]

function lerPedidos() {
  if (typeof localStorage === 'undefined') return []

  try {
    const dados = JSON.parse(localStorage.getItem(PEDIDOS_KEY) || '[]')
    return Array.isArray(dados) ? dados.filter((pedido) => pedido && pedido.id) : []
  } catch {
    return []
  }
}

function salvarPedidos(pedidosAtualizados) {
  if (typeof localStorage === 'undefined') {
    throw new Error('Não foi possível acessar o armazenamento dos pedidos.')
  }

  localStorage.setItem(PEDIDOS_KEY, JSON.stringify(pedidosAtualizados))
  pedidos.value = pedidosAtualizados
}

function criarId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`
}

function validarEndereco(endereco) {
  const camposObrigatorios = ['cep', 'rua', 'numero', 'bairro', 'cidade', 'estado']

  if (
    !endereco ||
    camposObrigatorios.some((campo) => !String(endereco[campo] || '').trim())
  ) {
    throw new Error('Preencha todos os campos obrigatórios do endereço de entrega.')
  }

  return Object.fromEntries(
    Object.entries(endereco).map(([campo, valor]) => [campo, String(valor || '').trim()]),
  )
}

export const pedidos = ref(lerPedidos())

export function pedidosDoUsuario(usuarioId) {
  if (!usuarioId) return []

  return pedidos.value.filter((pedido) => String(pedido.usuarioId) === String(usuarioId))
}

export function criarPedido({ usuarioId, itens, transportadoraId, endereco }) {
  if (!usuarioId) {
    throw new Error('Entre na sua conta para concluir a compra.')
  }

  if (!Array.isArray(itens) || itens.length === 0) {
    throw new Error('Adicione ao menos um produto antes de finalizar a compra.')
  }

  const transportadora = transportadorasDisponiveis.find(
    (opcao) => opcao.id === transportadoraId,
  )

  if (!transportadora) {
    throw new Error('Selecione uma transportadora válida.')
  }

  const agora = new Date()
  const previsaoEntrega = new Date(agora)
  previsaoEntrega.setDate(previsaoEntrega.getDate() + transportadora.prazoMaximoDias)

  const pedido = {
    id: criarId(),
    usuarioId,
    criadoEm: agora.toISOString(),
    status: 'Pedido confirmado',
    produtos: itens.map((item) => ({
      id: item.id,
      titulo: item.titulo,
      imagem: item.imagem,
      preco: Number(item.preco) || 0,
      quantidade: Math.max(1, Number(item.quantidade) || 1),
    })),
    subtotal: itens.reduce(
      (total, item) => total + (Number(item.preco) || 0) * (Number(item.quantidade) || 1),
      0,
    ),
    transportadora: {
      id: transportadora.id,
      nome: transportadora.nome,
      valorFrete: transportadora.valorFrete,
      prazoMinimoDias: transportadora.prazoMinimoDias,
      prazoMaximoDias: transportadora.prazoMaximoDias,
    },
    endereco: validarEndereco(endereco),
    previsaoEntrega: previsaoEntrega.toISOString(),
  }

  salvarPedidos([pedido, ...pedidos.value])
  return pedido
}

function buscarPedidoDoUsuario(pedidoId, usuarioId) {
  const pedido = pedidos.value.find(
    (item) => item.id === pedidoId && String(item.usuarioId) === String(usuarioId),
  )

  if (!pedido) {
    throw new Error('Não foi possível encontrar esse pedido na sua conta.')
  }

  if (pedido.status === 'Entregue' || pedido.status === 'Cancelado') {
    throw new Error('Este pedido não permite mais alterações.')
  }

  return pedido
}

export function alterarEnderecoPedido(pedidoId, usuarioId, endereco) {
  const pedido = buscarPedidoDoUsuario(pedidoId, usuarioId)
  const pedidosAtualizados = pedidos.value.map((item) =>
    item.id === pedido.id
      ? {
          ...item,
          endereco: validarEndereco(endereco),
          enderecoAtualizadoEm: new Date().toISOString(),
        }
      : item,
  )

  salvarPedidos(pedidosAtualizados)
}

export function excluirPedido(pedidoId, usuarioId) {
  const pedido = buscarPedidoDoUsuario(pedidoId, usuarioId)
  salvarPedidos(pedidos.value.filter((item) => item.id !== pedido.id))
}
