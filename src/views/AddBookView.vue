<template>
  <section class="p-4 max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Add Book</h2>

    <form @submit.prevent="addBook" class="space-y-3">
      <input
        v-model.number="isbn"
        type="number"
        placeholder="ISBN (number)"
        class="w-full border p-2"
        required
      />
      <input
        v-model.trim="name"
        type="text"
        placeholder="Book Name"
        class="w-full border p-2"
        required
      />
      <button :disabled="submitting" class="border px-4 py-2">
        {{ submitting ? 'Saving…' : 'Add' }}
      </button>
    </form>

    <p v-if="msg" class="mt-3">{{ msg }}</p>

    <div class="mt-6">
      <h3 class="text-xl font-semibold mb-2">Book List (isbn > 1000)</h3>
      <ul v-if="books.length">
        <li v-for="b in books" :key="b.id" class="py-2 border-b">
          <div class="font-medium">{{ b.name }}</div>
          <div class="text-sm text-gray-500">isbn: {{ b.isbn }}</div>
        </li>
      </ul>
      <p v-else class="text-gray-500">No matched books.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { db } from '@/firebase/init'
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot
} from 'firebase/firestore'

const isbn = ref(null)
const name = ref('')
const msg = ref('')
const submitting = ref(false)

const books = ref([])
let unlisten = null

onMounted(() => {
  const q = query(collection(db, 'books'), where('isbn', '>', 1000))
  unlisten = onSnapshot(q, (snap) => {
    books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  })
})
onUnmounted(() => { if (unlisten) unlisten() })

async function addBook () {
  if (!isbn.value || !name.value) {
    msg.value = 'Both fields are required'
    return
  }
  submitting.value = true
  msg.value = ''
  try {
    await addDoc(collection(db, 'books'), {
      isbn: Number(isbn.value),
      name: name.value
    })
    msg.value = 'Book added! (name will be capitalised by Functions)'
    isbn.value = null
    name.value = ''
  } catch (e) {
    msg.value = e?.message || 'Failed to add'
  } finally {
    submitting.value = false
  }
}
</script>