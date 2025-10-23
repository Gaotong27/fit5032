<template>
  <div class="page">
    <div class="card">
      <h1 class="title">Book Counter</h1>
      <button
        class="btn btn-primary"
        :disabled="loading"
        @click="getBookCount"
      >
        <span v-if="!loading">Get Book Count</span>
        <span v-else>Loading…</span>
      </button>
      <p class="hint">Click the button to fetch total books from Cloud Functions.</p>
      <p v-if="count !== null" class="result">
        Total number of books: <strong>{{ count }}</strong>
      </p>
      <p v-else-if="error" class="error">error: {{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const count = ref(null)
const error = ref('')
const loading = ref(false)
const FUNCTION_URL = 'https://us-central1-week7-tonggao.cloudfunctions.net/countBooks'

async function getBookCount () {
  loading.value = true
  error.value = ''
  count.value = null
  try {
    const res = await axios.get(FUNCTION_URL)
    count.value = res.data?.count ?? 0
  } catch (e) {
    error.value = e?.response?.data?.error || e?.message || 'Unknown error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.page {
  min-height: 70vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: #fff;
}

.card {
  width: min(640px, 92vw);
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 28px 24px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  background: #fff;
}

.title {
  font-size: 28px;
  margin: 0 0 18px;
  font-weight: 600;
  color: #111827;
  text-align: left;
}

.hint {
  margin: 10px 0 0;
  color: #6b7280;
  font-size: 14px;
}

.result {
  margin-top: 18px;
  font-size: 18px;
  color: #111827;
}

.error {
  margin-top: 18px;
  color: #b91c1c;
  font-weight: 500;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform .02s ease, opacity .2s ease;
}

.btn:disabled {
  opacity: .6;
  cursor: not-allowed;
}

.btn-primary {
  background: #2563eb;
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
}
</style>