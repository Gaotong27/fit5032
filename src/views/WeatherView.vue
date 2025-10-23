<template>
  <section class="max-w-xl mx-auto mt-8">
    <h2 class="text-2xl font-bold mb-4">WEATHER APP</h2>

        <div class="flex gap-2 mb-6">
      <input
        v-model="city"
        type="text"
        class="w-full border p-2"
        placeholder="Enter city name"
      />
      <button class="border px-3" @click="searchByCity">Search</button>
    </div>

        <main v-if="weatherData">
      <div>
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      </div>
      <div>
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
      </div>
      <span>{{ weatherData.weather[0].description }}</span>
    </main>
  </section>
</template>

<script>
import axios from "axios";

const apikey = "0047753e44e88d8c5c609a880ce5b13a";

export default {
  name: "App",
  data() {
    return {
      city: "",
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: [],
    };
  },
  computed: {
    temperature() {
      return this.weatherData ? this.weatherData.main.temp.toFixed(2) : null;
    },
    iconUrl() {
      return this.weatherData
        ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
          await this.fetchWeatherData(url);
        });
      }
    },
    async searchByCity() {
      if (!this.city) return;
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        this.city
      )}&appid=${apikey}&units=metric`;
      await this.fetchWeatherData(url);
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
  },
};
</script>

<style scoped>
section {
  text-align: center;         
  display: flex;
  flex-direction: column;
  align-items: center;       
  justify-content: center;    
  min-height: 80vh;          
}

input {
  text-align: center;        
}
</style>
