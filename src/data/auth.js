import { ref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const USUARIOS_URL = `${API_URL}/usuarios`
const SESSAO_KEY = 'tradehub:sessao'
const usuarios = ref([])

function lerSessao() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSAO_KEY) || 'null')
  } catch {
    return null
  }
}

async function requisitar(url, opcoes) {
  const resposta = await fetch(url, opcoes)
  if (!resposta.ok) throw new Error(`Erro na API de usuários (${resposta.status}).`)
  return resposta.status === 204 ? null : resposta.json()
}

async function criarHash(senha) {
  const dados = new TextEncoder().encode(senha)
  const hash = await crypto.subtle.digest('SHA-256', dados)
  return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

function dadosPublicos(usuario) {
  if (!usuario) return null
  const { senhaHash, ...publico } = usuario
  return publico
}

export const usuarioAtual = ref(lerSessao())

export async function carregarUsuarios() {
  usuarios.value = await requisitar(USUARIOS_URL)
  return usuarios.value
}

export function quantidadeUsuariosCadastrados() {
  return usuarios.value.length
}

export function buscarUsuarioPorId(usuarioId) {
  const usuario = usuarios.value.find((item) => String(item.id) === String(usuarioId))
  return dadosPublicos(usuario)
}

export async function cadastrarUsuario({ nome, email, telefone, senha, foto }) {
  if (!usuarios.value.length) await carregarUsuarios()
  const emailNormalizado = email.trim().toLowerCase()
  if (usuarios.value.some((usuario) => usuario.email === emailNormalizado)) {
    throw new Error('Já existe uma conta com este e-mail.')
  }

  const novoUsuario = await requisitar(USUARIOS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: nome.trim(),
      email: emailNormalizado,
      telefone: telefone.trim(),
      foto,
      senhaHash: await criarHash(senha),
    }),
  })
  usuarios.value.push(novoUsuario)
}

export async function atualizarUsuario({ nome, email, telefone, foto }) {
  if (!usuarioAtual.value) throw new Error('Você precisa estar conectado para editar o perfil.')
  const emailNormalizado = email.trim().toLowerCase()
  const emUso = usuarios.value.some((usuario) =>
    String(usuario.id) !== String(usuarioAtual.value.id) && usuario.email === emailNormalizado,
  )
  if (emUso) throw new Error('Já existe uma conta com este e-mail.')

  const atualizado = await requisitar(`${USUARIOS_URL}/${usuarioAtual.value.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: nome.trim(), email: emailNormalizado, telefone: telefone.trim(), foto }),
  })
  usuarios.value = usuarios.value.map((usuario) =>
    String(usuario.id) === String(atualizado.id) ? atualizado : usuario,
  )
  const sessao = dadosPublicos(atualizado)
  sessionStorage.setItem(SESSAO_KEY, JSON.stringify(sessao))
  usuarioAtual.value = sessao
  return sessao
}

export async function entrar({ email, senha }) {
  const emailNormalizado = email.trim().toLowerCase()
  const senhaHash = await criarHash(senha)
  const encontrados = await requisitar(
    `${USUARIOS_URL}?email=${encodeURIComponent(emailNormalizado)}&senhaHash=${encodeURIComponent(senhaHash)}`,
  )
  const usuario = encontrados[0]
  if (!usuario) throw new Error('E-mail ou senha incorretos.')

  const sessao = dadosPublicos(usuario)
  sessionStorage.setItem(SESSAO_KEY, JSON.stringify(sessao))
  usuarioAtual.value = sessao
}

export function sair() {
  sessionStorage.removeItem(SESSAO_KEY)
  usuarioAtual.value = null
}
