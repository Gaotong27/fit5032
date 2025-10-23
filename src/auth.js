// src/auth.js
import { ref } from 'vue'

const LS_KEY = 'demo-auth'

export const isAuthenticated = ref(false)
export const currentUser = ref('')

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY) || '{}')
    isAuthenticated.value = !!saved.isAuthenticated
    currentUser.value = saved.currentUser || ''
  } catch {}
}
function save() {
  localStorage.setItem(
    LS_KEY,
    JSON.stringify({ isAuthenticated: isAuthenticated.value, currentUser: currentUser.value })
  )
}

export function login(username, password) {
  const VALID_USER = 'admin'
  const VALID_PASS = 'password123'

  if (username === VALID_USER && password === VALID_PASS) {
    isAuthenticated.value = true
    currentUser.value = username
    save()
    return { ok: true }
  }
  return { ok: false, message: 'Invalid username or password' }
}

export function logout() {
  isAuthenticated.value = false
  currentUser.value = ''
  save()
}

load()
