<template>
  <section class="mt-6">
    <h3 class="text-xl font-semibold mb-3">Book List (isbn &gt; {{ minIsbn }})</h3>

    <button class="border px-3 py-1 mb-3" @click="load">Reload</button>

    <div v-if="loading">Loading...</div>
    <div v-else-if="books.length === 0" class="text-gray-500">No matched books.</div>

    <ul v-else class="space-y-2">
      <li v-for="b in books" :key="b.id" class="border p-3 rounded">
        <div class="font-medium">{{ b.name }}</div>
        <div class="text-sm text-gray-600">isbn: {{ b.isbn }}</div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/firebase/init'          
import { collection, getDocs, query, where } from 'firebase/firestore'

const props = defineProps({
  minIsbn: { type: Number, default: 1000 }   
})

const books = ref([])
const loading = ref(false)

async function load () {                    
  loading.value = true
  try {
    const q = query(
      collection(db, 'books'),             
      where('isbn', '>', Number(props.minIsbn)) 
    )
    const snap = await getDocs(q)
    books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>