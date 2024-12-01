# WeatherView

A modern weather application built with React that provides real-time weather information and forecasts for cities worldwide.

![WeatherView Screenshot](screenshot.png)

## Features

- ☀️ Real-time weather data display
- 🌡️ Temperature display in both Celsius and Fahrenheit
- 📊 Hourly weather forecast (24 hours)
- 📅 7-day weather forecast
- 🔍 City search functionality with debouncing
- 📝 Recent search history
- 🎨 Modern, responsive UI
- ⚡ Loading states and error handling

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- Axios
- OpenWeatherMap API
- Lucide Icons

## Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key (get it from [OpenWeatherMap](https://openweathermap.org/api))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ndaedxo/Weather-Forecast-App.git
cd weatherview
```

2. Install dependencies:
```bash
npm install
```

3. Create a copy of the weatherService.ts file and add your API key:
Navigate to `src/api/weatherService.ts` and replace `YOUR_API_KEY` with your actual OpenWeatherMap API key:

```typescript
const API_KEY = 'your_actual_api_key_here';
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. **Search for a City**
   - Enter a city name in the search bar
   - Press enter or click the search icon

2. **Switch Temperature Units**
   - Click the "Celsius" or "Fahrenheit" buttons to toggle between temperature units

3. **View Weather Details**
   - Current temperature and conditions
   - Feels like temperature
   - Humidity
   - Wind speed
   - Pressure
   - Visibility
   - Sunrise and sunset times

4. **Check Forecasts**
   - Scroll through the hourly forecast for the next 24 hours
   - View the 7-day forecast below

5. **Recent Searches**
   - View your recent search history at the bottom
   - Click the 'X' icon to remove items from the history

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be generated in the `dist` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)