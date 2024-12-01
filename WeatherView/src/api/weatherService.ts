import axios from 'axios';

const API_KEY = '01038f907418e26170accc5b1a0a8576'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (city: string, unit: string = 'metric') => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&units=${unit}&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export const fetchForecast = async (lat: number, lon: number, unit: string = 'metric') => {
  try {
    const response = await axios.get(
      `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&units=${unit}&exclude=minutely,alerts&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch forecast data');
  }
};