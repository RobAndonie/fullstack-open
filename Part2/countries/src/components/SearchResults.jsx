import CountryData from "./CountryData";
import CountryList from "./CountryList";
import { useState } from "react";

const SearchResult = ({ search, countries }) => {
  const [selected, setSelected] = useState(null);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  if (selected !== null) {
    return <CountryData country={selected} />;
  } else if (search == "") {
    return "Search a country";
  } else if (filteredCountries.length > 10) {
    return "Too many matches, specify another filter";
  } else if (filteredCountries.length == 1) {
    return <CountryData country={filteredCountries[0]} />;
  } else {
    return (
      <CountryList
        filteredCountries={filteredCountries}
        setSelected={setSelected}
      />
    );
  }
};

export default SearchResult;
