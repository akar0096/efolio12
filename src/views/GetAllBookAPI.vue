<template>
  <div class="container py-4">
    <button @click="fetchBooks">Fetch Books</button>
    <div v-if="loading" class="mt-3">Loading books...</div>
    <pre v-if="books" >{{ formattedBooks }}</pre>
    <div v-if="error" class="text-danger mt-3">Error: {{ error }}</div>
  </div>
</template>
<script>
import axios from "axios";
import { ref, computed } from "vue";

export default {
  name: "GetAllBookAPI",
  setup() {
    const books = ref(null);
    const error = ref(null);
    const loading = ref(false);

    const fetchBooks = async () => {
      loading.value = true;
      error.value = null;

      try {
        const response = await axios.get(
          "https://us-central1-fit5032-week6-bf33b.cloudfunctions.net/getAllBooks"
        );
        books.value = response.data.books;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    const formattedBooks = computed(() =>
      books.value ? JSON.stringify(books.value, null, 2) : ""
    );

    return { books, error, loading, fetchBooks, formattedBooks };
  },
};
</script>

<style scoped>
.json-box {
  background-color: #f8f9fa;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  white-space: pre-wrap;
  font-family: monospace;
}
</style>
