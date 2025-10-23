<template>
  <section class="max-w-xl mx-auto mt-8">
    <h2 class="text-2xl font-bold mb-4">WEATHER APP</h2>

    <!-- 输入框 -->
    <div class="flex gap-2 mb-6">
      <input
        v-model="city"
        type="text"
        class="w-full border p-2"
        placeholder="Enter city name"
        @keyup.enter="searchByCity"
      />
      <button class="border px-3" @click="searchByCity">Search</button>
    </div>

    <!-- 错误提示 -->
    <p v-if="errorMsg" class="text-red-600 mb-4">{{ errorMsg }}</p>

    <!-- 显示天气信息 -->
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

const apikey = "0047753e44e88d8c5c609a880ce5b13a"; // ✅ 你的 API Key
const BASE_URL = "https://api.openweathermap.org/data/2.5"; // ✅ 全改成 HTTPS

export default {
  name: "WeatherView",
  data() {
    return {
      city: "",
      weatherData: null,
      errorMsg: "",
    };
  },
  computed: {
    temperature() {
      return this.weatherData ? this.weatherData.main.temp.toFixed(1) : null;
    },
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
        : null;
    },
  },
  mounted() {

    this.fetchCurrentLocationWeather();
  },
  methods: {
    async fetchCurrentLocationWeather() {
      this.errorMsg = "";
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
            await this.fetchWeatherData(url);
          },

          async () => {
            this.city = "Melbourne";
            await this.searchByCity();
          },
          { timeout: 8000 }
        );
      } else {
        this.city = "Melbourne";
        await this.searchByCity();
      }
    },

    async searchByCity() {
      this.errorMsg = "";
      if (!this.city) return;
      const url = `${BASE_URL}/weather?q=${encodeURIComponent(
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
        if (error.response) {
          if (error.response.status === 404) {
            this.errorMsg = "City not found. Please try another city.";
          } else if (error.response.status === 401) {
            this.errorMsg = "Invalid API key. Please check your key.";
          } else {
            this.errorMsg = `Error ${error.response.status}: Unable to fetch data.`;
          }
        } else {
          this.errorMsg =
            "Network error. Please ensure you're using HTTPS and try again.";
        }
        this.weatherData = null;
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