const CountryList = ({ filteredCountries, setSelected }) => {
  return (
    <ul>
      {filteredCountries.map((country) => (
        <li key={country.name.official}>
          <span>{country.name.common} </span>
          <button
            onClick={() => {
              setSelected(country);
            }}
          >
            show
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
