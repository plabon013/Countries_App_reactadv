import { api } from "../axios";
import axios from "axios";
import { WeatherData } from "../../types/weather";

const weatherApi = {
  getWeatherByCity: (city: string): Promise<WeatherData> => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    return axios
      .get<WeatherData>(url)
      .then((response) => response.data)  
      .catch((error) => {
        throw new Error(error.response ? error.response.data.message : "Failed to fetch weather data");
      });
  },
};

export default weatherApi;