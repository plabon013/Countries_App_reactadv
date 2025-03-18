import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAlLCountries,
  selectAllCountries,
} from "../../store/slices/countriesSlices";
import CountryCard from "./CountryCard";

const CountriesList = () => {
  const dispatch = useAppDispatch();
  // const countries = useAppSelector(selectAllCountries);
  const { countries, loading, error } = useAppSelector(
    (state) => state.countries
  );

  useEffect(() => {
    dispatch(fetchAlLCountries());
  }, [dispatch]);

  if (loading) return <h3>Loading countries...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div>
      <h1>Countries</h1>
      <div className="countries-list">
        {countries.map((country) => (
          <Link
            key={country.name.common}
            to={`/country/${encodeURIComponent(
              country.name.common.toLowerCase()
            )}`}
          >
            <CountryCard
              name={country.name.common}
              capital={country.capital?.[0] || "N/A"}
              population={country.population}
              flag={country.flags.png}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CountriesList;
