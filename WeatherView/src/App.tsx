import { useState, useEffect, FormEvent } from 'react';
import { fetchWeather, fetchForecast } from './api/weatherService';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import SearchHistory from './components/SearchHistory';
import HourlyForecast from './components/HourlyForecast';
import useDebounce from './hooks/useDebounce';
import { Search } from 'lucide-react';
import './index.css';

interface WeatherData {
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  weather: Array<{ description: string; icon: string }>;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: { speed: number };
  visibility: number;
  sys: {
    sunrise: number;
    sunset: number;
  };
}

interface ForecastData {
  hourly: Array<{
    dt: number;
    temp: number;
    weather: Array<{ description: string; icon: string }>;
  }>;
  daily: Array<{
    dt: number;
    temp: { day: number };
    weather: Array<{ description: string; icon: string }>;
  }>;
}

function App() {
  const [city, setCity] = useState<string>('London');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [unit, setUnit] = useState<string>('metric');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const debouncedCity = useDebounce(city, 500);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('city') as HTMLInputElement;
    setCity(input.value);
  };

  useEffect(() => {
    if (debouncedCity) {
      setLoading(true);
      setError(null);
      
      fetchWeather(debouncedCity, unit)
        .then((data) => {
          setWeather(data);
          return fetchForecast(data.coord.lat, data.coord.lon, unit);
        })
        .then((forecastData) => {
          setForecast(forecastData);
          setSearchHistory((prev) => 
            [debouncedCity, ...prev.filter(c => c !== debouncedCity)].slice(0, 5)
          );
        })
        .catch((err) => {
          setError('Unable to fetch weather data. Please check the city name and try again.');
          setWeather(null);
          setForecast(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [debouncedCity, unit]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Weather Forecast</h1>
          
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              name="city"
              placeholder="Enter city name..."
              defaultValue={city}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <Search />
            </button>
          </form>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setUnit('metric')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                unit === 'metric' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Celsius (°C)
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                unit === 'imperial' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Fahrenheit (°F)
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <WeatherCard weather={weather} unit={unit} loading={loading} />
        
        {weather && forecast && !loading && (
          <>
            <HourlyForecast hourly={forecast.hourly} unit={unit} />
            <ForecastCard forecast={forecast} unit={unit} />
            <SearchHistory 
              history={searchHistory} 
              onRemove={(cityName) => 
                setSearchHistory(prev => prev.filter(c => c !== cityName))
              } 
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;