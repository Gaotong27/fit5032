<template>
  <section class="max-w-2xl mx-auto mt-8">
    <h2 class="text-2xl font-bold mb-4">Get All Book API</h2>
    <pre v-if="result">{{ pretty }}</pre>
    <p v-else>Loading…</p>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "GetAllBookAPI",
  data() {
    return {
      result: null,
    };
  },
  computed: {
    pretty() {
      return JSON.stringify(this.result, null, 2);
    },
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const url = "https://australia-southeast1-week7-tonggao.cloudfunctions.net/getAllBooks";
        const res = await axios.get(url);
        this.result = res.data;
      } catch (e) {
        console.error(e);
        this.result = { error: true, message: String(e) };
      }
    },
  },
};
</script>

<style scoped>
section {
  text-align: center;
}
pre {
  text-align: left;
  background: #f8f8f8;
  padding: 1rem;
  border-radius: 6px;
  overflow: auto;
}
</style>