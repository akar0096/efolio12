<template>
  <div>
    <h3>Book Queries:</h3>

    <h3>Book with ISBN > 2000 (where)</h3>
    <ul>
      <li v-for="book in whereBooks" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
      </li>
    </ul>

    <h3>Books ordered by ISBN (orderBy)</h3>
    <ul>
      <li v-for="book in orderedBooks" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
      </li>
    </ul>

    <h3>First 2 Books (limit)</h3>
    <ul>
      <li v-for="book in limitedBooks" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"
import { db } from "@/firebase/init"
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore"

export default {
  setup() {
    const whereBooks = ref([])
    const orderedBooks = ref([])
    const limitedBooks = ref([])

    const runQueries = async () => {
      try {
        const q1 = query(collection(db, "books"), where("isbn", ">", 2000))
        const snapshot1 = await getDocs(q1)
        whereBooks.value = snapshot1.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        const q2 = query(collection(db, "books"), orderBy("isbn", "asc"))
        const snapshot2 = await getDocs(q2)
        orderedBooks.value = snapshot2.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        const q3 = query(collection(db, "books"), limit(2))
        const snapshot3 = await getDocs(q3)
        limitedBooks.value = snapshot3.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      } catch (error) {
        console.error("Error running queries:", error)
      }
    }

    onMounted(() => {
      runQueries()
    })

    return { whereBooks, orderedBooks, limitedBooks }
  },
}
</script>