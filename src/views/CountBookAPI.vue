<template>
  <div id="app">
        <pre v-if="jsondata">{{ jsondata }}</pre>
    <p v-if="error" style="color:red;">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      jsondata: null,
      error: null,
    };
  },
  methods: {
    async getBookCountAPI() {
      try {
        const response = await axios.get("https://countbooks-lm7secxx3a-uc.a.run.app");
        this.jsondata = response.data; 
        this.error = null;
      } catch (error) {
        console.error("Error fetching book count:", error);
        this.error = error.message || "Failed to fetch book count.";
        this.jsondata = null;
      }
    },
  },
  mounted() {
    this.getBookCountAPI();
  },
};
</script>
