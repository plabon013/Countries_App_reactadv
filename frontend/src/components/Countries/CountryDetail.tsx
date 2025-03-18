import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAlLCountries,
  selCountriesLoading,
  selectAllCountries,
  selectCountriesError,
} from "../../store/slices/countriesSlices";
import weatherApi from "../../api/services/weather";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import { WeatherData } from "../../types/weather";

const CountryDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAllCountries);
  const loading = useAppSelector(selCountriesLoading);
  const error = useAppSelector(selectCountriesError);

  // Find the country based on cc3
  const country = countries.find(
    (country) => country.name.common.toLowerCase() === name?.toLowerCase()
  );

  // Fetch countries if not available
  useEffect(() => {
    if (!country) {
      dispatch(fetchAlLCountries());
    }
  }, [country, dispatch]);

  // Fetch weather when country is available
  useEffect(() => {
    if (country?.capital) {
      weatherApi;
      weatherApi
        .getWeatherByCity(country.capital[0])
        .then(setWeather)
        .catch((err) => setWeatherError(err.message));
    }
  }, [country]);

  if (loading) return <h3>Loading country details... </h3>;
  if (error) return <h3>{error}</h3>;
  if (!country) return <h3>Country not found. Please try again.</h3>;

  return (
    <>
      <div className="country-detail">
        <h1>{country.name.common}</h1>
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
        <p>Capital: {country.capital?.[0] || "N/A"}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>
        <p>Subregion: {country.subregion}</p>
      </div>

      {/* Weather Info */}
      {weatherError ? <p>{weatherError}</p> : <WeatherInfo weather={weather} />}
    </>
  );
};

export default CountryDetail;
