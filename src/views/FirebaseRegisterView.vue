<template>
  <div class="container mt-5" style="max-width:480px">
    <h2 class="mb-4">Create an Account</h2>

    <div class="mb-3">
      <label class="form-label">Email</label>
      <input v-model.trim="email" type="email" class="form-control" placeholder="you@example.com" />
    </div>

    <div class="mb-3">
      <label class="form-label">Password</label>
      <input v-model="password" type="password" class="form-control" placeholder="Minimum 6 characters" />
    </div>

    <button class="btn btn-primary w-100" :disabled="loading" @click="register">
      {{ loading ? 'Registering...' : 'Save to Firebase' }}
    </button>

    <p class="text-muted mt-3" v-if="error">{{ error }}</p>
    <p class="mt-3">
      Already have an account?
      <router-link to="/login">Go to Login</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'   

const router = useRouter()
const auth = getAuth() 
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const register = async () => {
  error.value = ''
  loading.value = true
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log('Firebase Register Successful!')
    router.push('/login')   
  } catch (e) {
    console.log(e?.code || e)
    error.value = e?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>
