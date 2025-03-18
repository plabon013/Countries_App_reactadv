import { WeatherData } from "../../types/weather";

interface WeatherInfoProps {
  weather?: WeatherData | null;
  error?: string | null;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather, error }) => {
  if (error) {
    return <h3>Error: {error}</h3>;
  }

  if (!weather) {
    return <h3>Loading weather info...</h3>;
  }

  const { temp, humidity } = weather.main;
  const { speed } = weather.wind;
  const { description, icon } = weather.weather[0];

  const formattedTemp = temp.toFixed(1);
  const formattedSpeed = speed.toFixed(1);

  return (
    <div className="weather-info">
      <h3>How is the weather in that place?</h3>
      <p>Temperature: {formattedTemp}°C</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {formattedSpeed} m/s</p>
      <p>Description: {description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}.png`}
        alt={description}
      />
    </div>
  );
};

export default WeatherInfo;
