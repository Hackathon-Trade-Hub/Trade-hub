import { ref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const PEDIDOS_URL = `${API_URL}/pedidos`
const PEDIDOS_ANTIGOS_KEY = 'tradehub:pedidos'
const JSON_HEADERS = { 'Content-Type': 'application/json' }

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

export const pedidos = ref([])
export const carregandoPedidos = ref(false)
export const erroPedidos = ref('')

async function requisitar(url, opcoes) {
  let resposta

  try {
    resposta = await fetch(url, opcoes)
  } catch (erro) {
    throw new Error('Não foi possível conectar à API de pedidos. Verifique se o JSON Server está ligado.', {
      cause: erro,
    })
  }

  if (!resposta.ok) {
    throw new Error(`Erro na API de pedidos (${resposta.status}).`)
  }

  if (resposta.status === 204) return null
  return resposta.json()
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

async function migrarPedidosAntigos(pedidosNaApi) {
  if (typeof localStorage === 'undefined') return pedidosNaApi

  const dadosAntigos = localStorage.getItem(PEDIDOS_ANTIGOS_KEY)
  if (!dadosAntigos) return pedidosNaApi

  let pedidosAntigos
  try {
    pedidosAntigos = JSON.parse(dadosAntigos)
  } catch (erro) {
    throw new Error('Não foi possível ler o histórico antigo de pedidos.', { cause: erro })
  }

  if (!Array.isArray(pedidosAntigos)) {
    throw new Error('O histórico antigo de pedidos está em um formato inválido.')
  }

  const pedidosMigrados = [...pedidosNaApi]
  for (const pedidoAntigo of pedidosAntigos) {
    if (!pedidoAntigo?.id) continue

    const jaMigrado = pedidosMigrados.some(
      (pedido) =>
        String(pedido.id) === String(pedidoAntigo.id) ||
        String(pedido.idMigrado) === String(pedidoAntigo.id),
    )
    if (jaMigrado) continue

    const { id, ...dadosPedidoAntigo } = pedidoAntigo
    const pedidoCriado = await requisitar(PEDIDOS_URL, {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify({ ...dadosPedidoAntigo, idMigrado: String(id) }),
    })
    pedidosMigrados.push(pedidoCriado)
  }

  localStorage.removeItem(PEDIDOS_ANTIGOS_KEY)
  return pedidosMigrados
}

export async function carregarPedidos() {
  carregandoPedidos.value = true
  erroPedidos.value = ''

  try {
    const pedidosDaApi = await requisitar(PEDIDOS_URL)
    if (!Array.isArray(pedidosDaApi)) {
      throw new Error('A rota /pedidos precisa retornar uma lista.')
    }

    const pedidosCarregados = await migrarPedidosAntigos(pedidosDaApi)
    pedidos.value = pedidosCarregados
    return pedidos.value
  } catch (erro) {
    console.error('Não foi possível carregar pedidos do JSON Server:', erro)
    erroPedidos.value =
      erro instanceof Error
        ? erro.message
        : 'Não foi possível carregar seus pedidos. Verifique se a API está ligada.'
    return []
  } finally {
    carregandoPedidos.value = false
  }
}

export function pedidosDoUsuario(usuarioId) {
  if (usuarioId === undefined || usuarioId === null) return []

  return pedidos.value.filter((pedido) => String(pedido.usuarioId) === String(usuarioId))
}

function buscarPedidoDoUsuario(pedidoId, usuarioId) {
  const pedido = pedidos.value.find(
    (item) =>
      String(item.id) === String(pedidoId) &&
      String(item.usuarioId) === String(usuarioId),
  )

  if (!pedido) {
    throw new Error('Não foi possível encontrar esse pedido na sua conta.')
  }

  if (pedido.status === 'Entregue' || pedido.status === 'Cancelado') {
    throw new Error('Este pedido não permite mais alterações.')
  }

  return pedido
}

export async function criarPedido({ usuarioId, itens, transportadoraId, endereco }) {
  if (usuarioId === undefined || usuarioId === null) {
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

  const dadosPedido = {
    usuarioId: String(usuarioId),
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

  const pedidoCriado = await requisitar(PEDIDOS_URL, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(dadosPedido),
  })

  pedidos.value = [pedidoCriado, ...pedidos.value]
  erroPedidos.value = ''
  return pedidoCriado
}

export async function alterarEnderecoPedido(pedidoId, usuarioId, endereco) {
  buscarPedidoDoUsuario(pedidoId, usuarioId)
  const pedidoAtualizado = await requisitar(`${PEDIDOS_URL}/${pedidoId}`, {
    method: 'PATCH',
    headers: JSON_HEADERS,
    body: JSON.stringify({
      endereco: validarEndereco(endereco),
      enderecoAtualizadoEm: new Date().toISOString(),
    }),
  })

  pedidos.value = pedidos.value.map((pedido) =>
    String(pedido.id) === String(pedidoId) ? pedidoAtualizado : pedido,
  )
  return pedidoAtualizado
}

export async function excluirPedido(pedidoId, usuarioId) {
  buscarPedidoDoUsuario(pedidoId, usuarioId)
  await requisitar(`${PEDIDOS_URL}/${pedidoId}`, { method: 'DELETE' })
  pedidos.value = pedidos.value.filter(
    (pedido) => String(pedido.id) !== String(pedidoId),
  )
}
