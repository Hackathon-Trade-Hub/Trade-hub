import { ref } from 'vue'

const USUARIOS_KEY = 'tradehub:usuarios'
const SESSAO_KEY = 'tradehub:sessao'

function lerUsuarios() {
  return JSON.parse(localStorage.getItem(USUARIOS_KEY) || '[]')
}

function salvarUsuarios(usuarios) {
  localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios))
}

function criarId() {
  return crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`
}

async function criarHash(senha) {
  const dados = new TextEncoder().encode(senha)
  const hash = await crypto.subtle.digest('SHA-256', dados)

  return [...new Uint8Array(hash)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export const usuarioAtual = ref(
  JSON.parse(sessionStorage.getItem(SESSAO_KEY) || 'null')
)

export async function cadastrarUsuario({ nome, email, telefone, senha, foto }) {
  const usuarios = lerUsuarios()
  const emailNormalizado = email.trim().toLowerCase()

  if (usuarios.some((usuario) => usuario.email === emailNormalizado)) {
    throw new Error('Já existe uma conta com este e-mail.')
  }

  const novoUsuario = {
    id: criarId(),
    nome: nome.trim(),
    email: emailNormalizado,
    telefone: telefone.trim(),
    foto,
    senhaHash: await criarHash(senha),
  }

  usuarios.push(novoUsuario)
  salvarUsuarios(usuarios)
}

export async function entrar({ email, senha }) {
  const emailNormalizado = email.trim().toLowerCase()
  const senhaHash = await criarHash(senha)
  const usuario = lerUsuarios().find(
    (item) => item.email === emailNormalizado && item.senhaHash === senhaHash
  )

  if (!usuario) {
    throw new Error('E-mail ou senha incorretos.')
  }

  const sessao = {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    telefone: usuario.telefone,
    foto: usuario.foto,
  }

  sessionStorage.setItem(SESSAO_KEY, JSON.stringify(sessao))
  usuarioAtual.value = sessao
}

export function sair() {
  sessionStorage.removeItem(SESSAO_KEY)
  usuarioAtual.value = null
}
