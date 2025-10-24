<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}

      
        <button @click="deleteBook(book.id)" >Delete</button>    
        <button @click="editBook(book)" >Edit</button>
      </li>
    </ul>

    
    <div v-if="editingBook" class="mt-3">
      <h3>Edit Book</h3>
      <form @submit.prevent="updateBook">
        <input type="text" v-model="editName" placeholder="Book Name" required />
        <input type="number" v-model="editIsbn" placeholder="ISBN" required />
        <button type="submit" >Update</button>
        <button @click="cancelEdit" type="button">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue"
import { db } from "@/firebase/init"
import { collection, query, where, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore"

export default {
  setup() {
    const books = ref([])
    const editingBook = ref(null)
    const editName = ref("")
    const editIsbn = ref("")

    let unsubscribe = null

    onMounted(() => {
      const q = query(collection(db, "books"), where("isbn", ">", 1000))

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const booksArray = []
        querySnapshot.forEach((docSnap) => {
          booksArray.push({ id: docSnap.id, ...docSnap.data() })
        })
        books.value = booksArray
      })
    })

    onUnmounted(() => {
      if (unsubscribe) unsubscribe()
    })

    const deleteBook = async (id) => {
      try {
        await deleteDoc(doc(db, "books", id))
        alert("Book deleted successfully!")
      } catch (error) {
        console.error("Error deleting book:", error)
      }
    }

    const editBook = (book) => {
      editingBook.value = book.id
      editName.value = book.name
      editIsbn.value = book.isbn
    }

    const cancelEdit = () => {
      editingBook.value = null
      editName.value = ""
      editIsbn.value = ""
    }

    const updateBook = async () => {
      try {
        const bookRef = doc(db, "books", editingBook.value)
        await updateDoc(bookRef, {
          name: editName.value,
          isbn: Number(editIsbn.value),
        })
        alert("Book updated successfully!")
        cancelEdit()
      } catch (error) {
        console.error("Error updating book:", error)
      }
    }

    return {
      books,
      deleteBook,
      editBook,
      updateBook,
      cancelEdit,
      editingBook,
      editName,
      editIsbn,
    }
  },
}
</script>