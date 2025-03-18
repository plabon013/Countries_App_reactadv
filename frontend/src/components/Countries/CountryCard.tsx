import React from "react";

interface CountryCardProps {
  name: string;
  capital: string;
  population: number;
  flag: string;
}

const CountryCard: React.FC<CountryCardProps> = ({
  name,
  capital,
  population,
  flag,
}) => {
  return (
    <div className="country-card">
      <img src={flag} alt={`${name} flag`} />
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
    </div>
  );
};

export default CountryCard;
