import React from 'react';

interface ForecastData {
  daily: Array<{
    dt: number;
    temp: { day: number };
    weather: Array<{ description: string; icon: string }>;
  }>;
}

interface ForecastCardProps {
  forecast: ForecastData;
  unit: string;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, unit }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">7-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
        {forecast.daily.slice(0, 7).map((day, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 text-center transition-transform hover:scale-105"
          >
            <h4 className="text-gray-800 font-medium">
              {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
            </h4>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="w-12 h-12 mx-auto"
            />
            <p className="text-lg font-semibold">{Math.round(day.temp.day)}°{unit === 'metric' ? 'C' : 'F'}</p>
            <p className="text-sm text-gray-500 capitalize">{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;