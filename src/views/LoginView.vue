<template>
  <div class="container" style="max-width: 520px;">
    <h1 class="my-4 text-center">🔐 Login</h1>

    <form @submit.prevent="handleLogin" class="card p-4 shadow-sm">
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input v-model="username" type="text" class="form-control" autocomplete="username" />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control" autocomplete="current-password" />
      </div>

      <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>

      <button class="btn btn-primary w-100" type="submit">Login</button>
      <small class="text-muted mt-2">Hint: admin / password123</small>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '@/auth'
import { useRouter, useRoute } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const route = useRoute()

const handleLogin = () => {
  const res = login(username.value.trim(), password.value)
  if (res.ok) {
    const redirect = route.query.redirect || '/about'
    router.push(redirect)
  } else {
    error.value = res.message || 'Login failed'
  }
}
</script>

<style scoped>
.container { margin-top: 56px; }
</style>
