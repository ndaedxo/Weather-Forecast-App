import React from 'react';

interface HourlyForecastProps {
  hourly: Array<{
    dt: number;
    temp: number;
    weather: Array<{ description: string; icon: string }>;
  }>;
  unit: string;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly, unit }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Hourly Forecast</h3>
      <div className="flex overflow-x-auto pb-4 gap-4">
        {hourly.slice(0, 24).map((hour, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 text-center min-w-[120px]">
            <h4 className="text-gray-800 font-medium">
              {new Date(hour.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' })}
            </h4>
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt={hour.weather[0].description}
              className="w-12 h-12 mx-auto"
            />
            <p className="text-lg font-semibold">{Math.round(hour.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
            <p className="text-sm text-gray-500 capitalize">{hour.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;