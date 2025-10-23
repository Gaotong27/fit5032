<template>
  <section class="p-4 max-w-3xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Books Admin</h2>

    <div class="flex gap-2 items-end mb-4">
      <input v-model.trim="qName" placeholder="where name == ?" class="border p-2" />
      <select v-model="orderByField" class="border p-2">
        <option value="isbn">orderBy isbn</option>
        <option value="name">orderBy name</option>
      </select>
      <input v-model.number="limitN" type="number" min="1" placeholder="limit" class="border p-2 w-24" />
      <button @click="runQuery" class="border px-4 py-2">Query</button>
      <button @click="loadAll" class="border px-4 py-2">Load All</button>
    </div>

    <div v-if="books.length === 0" class="text-gray-500">No data</div>
    <ul class="space-y-2">
      <li v-for="b in books" :key="b.id" class="border p-3 rounded">
        <div class="font-semibold">{{ b.name }} <span class="text-sm text-gray-500">(isbn: {{ b.isbn }})</span></div>

        <div class="mt-2 flex gap-2">
          <button @click="startEdit(b)" class="border px-3 py-1">Edit</button>
          <button @click="remove(b.id)" class="border px-3 py-1">Delete</button>
        </div>

        <div v-if="editId === b.id" class="mt-2 grid grid-cols-2 gap-2">
          <input v-model="editForm.name" class="border p-1" />
          <input v-model.number="editForm.isbn" type="number" class="border p-1" />
          <button @click="saveEdit" class="border px-3 py-1">Save</button>
          <button @click="cancelEdit" class="border px-3 py-1">Cancel</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { db } from '@/firebase/init'
import {
  collection, getDocs, query, where, orderBy, limit,
  doc, updateDoc, deleteDoc
} from 'firebase/firestore'

const books = ref([])
const qName = ref('')
const orderByField = ref('isbn')
const limitN = ref(5)

async function loadAll () {
  const snap = await getDocs(collection(db, 'books'))
  books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

async function runQuery () {
  const clauses = []
  if (qName.value) clauses.push(where('name', '==', qName.value))
  clauses.push(orderBy(orderByField.value))
  if (limitN.value) clauses.push(limit(limitN.value))
  const snap = await getDocs(query(collection(db, 'books'), ...clauses))
  books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

const editId = ref(null)
const editForm = ref({ name: '', isbn: null })
function startEdit (b) {
  editId.value = b.id
  editForm.value = { name: b.name, isbn: b.isbn }
}
function cancelEdit () { editId.value = null }

async function saveEdit () {
  if (!editId.value) return
  await updateDoc(doc(db, 'books', editId.value), {
    name: editForm.value.name,
    isbn: Number(editForm.value.isbn)
  })
  await loadAll()
  editId.value = null
}

async function remove (id) {
  await deleteDoc(doc(db, 'books', id))
  await loadAll()
}

loadAll()
</script>