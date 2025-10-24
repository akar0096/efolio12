<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <button @click="searchByCity" class="search-button">
          Search
        </button>
      </div>
    </div>
  </div>
      <main>
        <div v-if="weatherData"> 
          <h2>
              {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>
          <div> 
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
      </main>
</template>

 <script>
import axios from "axios"
const apikey = "6401762486bd778ba65347bdfe5062f0"
export default {
  name: "WeatherView",
  data() {
    return {
      city: "",
      weatherData: null,
      error: null,
    }
  },
  computed: {
    temperature() {
      return this.weatherData ? Math.round(this.weatherData.main.temp) : null
    },
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
        : null
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather()
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`
          await this.fetchWeatherData(url)
        })
      }
    },
    async searchByCity() {
      if (!this.city) {
        this.error = "Please enter a city name."
        return
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}&units=metric`
      await this.fetchWeatherData(url)
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url)
        this.weatherData = response.data
        this.error = null
      } catch (error) {
        console.error("Error fetching weather data:", error)
        this.error = "City not found or API error."
        this.weatherData = null
      }
    },
  },
}
</script>