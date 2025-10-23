<template>
  <div class="container mt-5" style="max-width:480px">
    <h2 class="mb-4">Sign In</h2>

    <div class="mb-3">
      <label class="form-label">Email</label>
      <input
        v-model="email"
        type="text"
        class="form-control"
        placeholder="Email"
      />
    </div>

    <div class="mb-3">
      <label class="form-label">Password</label>
      <input
        v-model="password"
        type="password"
        class="form-control"
        placeholder="Password"
      />
    </div>

    <button class="btn btn-success w-100" @click="signin">
      Sign in via Firebase
    </button>

    <p class="text-danger mt-3" v-if="error">{{ error }}</p>

    <p class="mt-3 text-center">
      Don’t have an account?
      <router-link class="btn btn-link" to="/register">Go to Register</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const error = ref("")
const router = useRouter()
const auth = getAuth()

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Sign In Successful!")
      console.log(auth.currentUser)
      router.push("/")
    })
    .catch((err) => {
      console.error(err.code, err.message)
      error.value = err.message
    })
}
</script>
