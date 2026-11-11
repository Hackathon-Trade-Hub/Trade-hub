import { ref } from 'vue'

const url = 'http://localhost:3000/usuarios'

export const usuarios = ref([])
export const usuarioAtual = ref(JSON.parse(sessionStorage.getItem('usuario') || 'null'))

async function criarHash(senha) {
  const dados = new TextEncoder().encode(senha)
  const hash = await crypto.subtle.digest('SHA-256', dados)
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function semSenha(usuario) {
  if (!usuario) return null
  const { senhaHash: _senha, ...resto } = usuario
  return resto
}

function salvarSessao(usuario) {
  sessionStorage.setItem('usuario', JSON.stringify(usuario))
  usuarioAtual.value = usuario
}

export async function carregarUsuarios() {
  const resposta = await fetch(url)
  if (!resposta.ok) throw new Error('Não foi possível carregar os usuários.')
  usuarios.value = await resposta.json()
  return usuarios.value.map(semSenha)
}

export function quantidadeUsuariosCadastrados() {
  return usuarios.value.length
}

export function buscarUsuarioPorId(id) {
  return semSenha(usuarios.value.find((u) => String(u.id) === String(id)))
}

export async function consultarUsuario(id) {
  const resposta = await fetch(`${url}/${id}`)
  if (resposta.status === 404) throw new Error('Usuário não encontrado.')
  if (!resposta.ok) throw new Error('Erro ao buscar o usuário.')
  return semSenha(await resposta.json())
}

async function emailJaExiste(email, idIgnorado) {
  const resposta = await fetch(`${url}?email=${encodeURIComponent(email)}`)
  const lista = await resposta.json()
  return lista.some((u) => String(u.id) !== String(idIgnorado))
}

export async function cadastrarUsuario({ nome, email, telefone, senha, foto }) {
  email = email.trim().toLowerCase()
  if (await emailJaExiste(email, null)) throw new Error('Já existe uma conta com este e-mail.')

  const resposta = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: nome.trim(),
      email,
      telefone,
      foto,
      senhaHash: await criarHash(senha),
    }),
  })
  if (!resposta.ok) throw new Error('Erro ao cadastrar o usuário.')
  const novo = await resposta.json()
  usuarios.value.push(novo)
}

export async function atualizarUsuario({ nome, email, telefone, foto }) {
  email = email.trim().toLowerCase()
  const id = usuarioAtual.value.id
  if (await emailJaExiste(email, id)) throw new Error('Já existe uma conta com este e-mail.')

  const resposta = await fetch(`${url}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: nome.trim(), email, telefone, foto }),
  })
  if (!resposta.ok) throw new Error('Erro ao atualizar o usuário.')
  const atualizado = await resposta.json()
  usuarios.value = usuarios.value.map((u) => (u.id === atualizado.id ? atualizado : u))
  salvarSessao(semSenha(atualizado))
}

export async function excluirUsuario(id) {
  const resposta = await fetch(`${url}/${id}`, { method: 'DELETE' })
  if (!resposta.ok) throw new Error('Erro ao excluir o usuário.')
  usuarios.value = usuarios.value.filter((u) => String(u.id) !== String(id))
  if (String(usuarioAtual.value?.id) === String(id)) sair()
}

export async function entrar({ email, senha }) {
  const senhaHash = await criarHash(senha)
  const resposta = await fetch(
    `${url}?email=${encodeURIComponent(email.trim().toLowerCase())}&senhaHash=${senhaHash}`,
  )
  if (!resposta.ok) throw new Error('Erro ao fazer login.')
  const lista = await resposta.json()
  if (lista.length === 0) throw new Error('E-mail ou senha incorretos.')
  salvarSessao(semSenha(lista[0]))
}

export function sair() {
  sessionStorage.removeItem('usuario')
  usuarioAtual.value = null
}
