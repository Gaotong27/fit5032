<template>
  <div class="container">
    <header class="d-flex justify-content-center align-items-center gap-3 py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home (Week 5)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Firelogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin" class="nav-link" active-class="active">Admin</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GetBookCount" class="nav-link" active-class="active">Get Book Count</router-link>
        </li>
        <li>
          <router-link to="/WeatherCheck" class="nav-link" active-class="active">Get Weather</router-link>
        </li>
        <li>
          <router-link to="/CountBookAPI" class="nav-link" active-class="active">Count Book API</router-link>
        </li>
      </ul>

      <div class="ms-auto d-flex align-items-center gap-2">
        <span v-if="isAuthenticated" class="text-muted small">Hi, {{ currentUser }}</span>

        <router-link v-if="!isAuthenticated" to="/login" class="btn btn-outline-primary btn-sm">
          Login
        </router-link>

        <button v-else class="btn btn-outline-secondary btn-sm" @click="doLogout">
          Logout
        </button>
      </div>
    </header>
  </div>
</template>

<script setup>
import { isAuthenticated, currentUser, logout } from '@/auth'
import { useRouter } from 'vue-router'
const router = useRouter()

function doLogout() {
  logout()
  router.push('/login')
}
</script>

<style scoped>
</style>
