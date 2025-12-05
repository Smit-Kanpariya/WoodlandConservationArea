import { useState, useEffect } from 'react';
import {
  Cloud,
  CloudRain,
  CloudSnow,
  CloudSun,
  Droplets,
  Sun,
  CloudLightning,
  CloudFog,
  Wind,
  Gauge
} from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    surface_pressure: number;
    apparent_temperature: number;
  };
}

const LATITUDE = 44.6239;
const LONGITUDE = -63.9205;

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Using Open-Meteo API which is free and doesn't require an API key
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure,apparent_temperature&timezone=America%2FHalifax`
        );

        if (!response.ok) {
          throw new Error('Weather data not available');
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError('Weather N/A');
        console.error('Error fetching weather:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherDescription = (code: number): string => {
    const weatherCodes: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Fog',
      51: 'Light drizzle',
      53: 'Drizzle',
      55: 'Dense drizzle',
      56: 'Freezing drizzle',
      57: 'Freezing drizzle',
      61: 'Light rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      66: 'Freezing rain',
      67: 'Freezing rain',
      71: 'Snow fall',
      73: 'Snow fall',
      75: 'Snow fall',
      77: 'Snow grains',
      80: 'Rain showers',
      81: 'Rain showers',
      82: 'Rain showers',
      85: 'Snow showers',
      86: 'Snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with hail',
      99: 'Thunderstorm with hail'
    };
    return weatherCodes[code] || 'Unknown';
  };

  const getWeatherIcon = (code: number, size = 'w-4 h-4') => {
    const description = getWeatherDescription(code).toLowerCase();
    if (description.includes('clear')) return <Sun className={size} />;
    if (description.includes('cloud') || description.includes('overcast')) return <Cloud className={size} />;
    if (description.includes('rain') || description.includes('drizzle')) return <CloudRain className={size} />;
    if (description.includes('snow') || description.includes('hail')) return <CloudSnow className={size} />;
    if (description.includes('thunder')) return <CloudLightning className={size} />;
    if (description.includes('fog') || description.includes('mist')) return <CloudFog className={size} />;
    return <CloudSun className={size} />;
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2 px-3">
        <Skeleton className="w-16 h-6" />
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="flex items-center text-sm text-muted-foreground px-3">
        <CloudSun className="w-4 h-4 mr-1" />
        <span>Weather N/A</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="flex items-center space-x-2 px-3 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center">
          {getWeatherIcon(weather.current.weather_code)}
          <span className="ml-1 font-medium">{Math.round(weather.current.temperature_2m)}°C</span>
        </div>
      </div>

      {/* Weather Details Popup */}
      {isHovered && (
        <div
          className="absolute z-50 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">French Village, NS</h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getWeatherIcon(weather.current.weather_code, 'w-10 h-10')}
                <div className="ml-2">
                  <div className="text-2xl font-bold">{Math.round(weather.current.temperature_2m)}°C</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {getWeatherDescription(weather.current.weather_code)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm">
                  Feels like {Math.round(weather.current.apparent_temperature)}°C
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 text-sm">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span>Humidity: {weather.current.relative_humidity_2m}%</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Wind className="w-4 h-4 text-blue-500" />
                <span>Wind: {Math.round(weather.current.wind_speed_10m)} km/h</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Gauge className="w-4 h-4 text-blue-500" />
                <span>Pressure: {Math.round(weather.current.surface_pressure)} hPa</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
