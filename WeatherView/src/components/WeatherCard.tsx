import React from 'react';
import { 
  Thermometer,
  Droplets,
  Wind,
  Gauge,
  Eye,
  Sunrise,
  Sunset
} from 'lucide-react';
import WeatherCardSkeleton from './WeatherCardSkeleton';

interface WeatherData {
  name: string;
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

interface WeatherCardProps {
  weather: WeatherData | null;
  unit: string;
  loading?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, unit, loading }) => {
  if (loading || !weather) {
    return <WeatherCardSkeleton />;
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{weather.name}</h2>
          <p className="text-gray-600 capitalize mt-1">{weather.weather[0].description}</p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-20 h-20"
          />
          <p className="text-4xl font-semibold">
            {Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex items-center gap-2">
          <Thermometer className="text-blue-500" size={20} />
          <div>
            <p className="text-sm text-gray-600">Feels Like</p>
            <p className="font-semibold">
              {Math.round(weather.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Droplets className="text-blue-500" size={20} />
          <div>
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="font-semibold">{weather.main.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Wind className="text-blue-500" size={20} />
          <div>
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="font-semibold">
              {weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Gauge className="text-blue-500" size={20} />
          <div>
            <p className="text-sm text-gray-600">Pressure</p>
            <p className="font-semibold">{weather.main.pressure} hPa</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Eye className="text-blue-500" size={20} />
          <div>
            <p className="text-sm text-gray-600">Visibility</p>
            <p className="font-semibold">{(weather.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sunrise className="text-blue-500" size={20} />
          <div>
            <p className="text-sm text-gray-600">Sunrise</p>
            <p className="font-semibold">{formatTime(weather.sys.sunrise)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sunset className="text-blue-500" size={20} />
          <div>
            <p className="text-sm text-gray-600">Sunset</p>
            <p className="font-semibold">{formatTime(weather.sys.sunset)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;