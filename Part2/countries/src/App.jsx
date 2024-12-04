import Search from "./components/Search";
import SearchResult from "./components/SearchResults";
import { fetchCountries } from "./services/countriesApi";
import { useState, useEffect } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetchCountries();
        setCountries(response);
      } catch (error) {
        console.log(error);
      }
    };

    getCountries();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Search search={search} handleSearchChange={handleSearchChange} />

      <div>
        <SearchResult search={search} countries={countries} />
      </div>
    </div>
  );
};

export default App;
