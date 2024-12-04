import axios from "axios";

export const fetchCountries = async () => {
  const response = await axios.get(
    "https://studies.cs.helsinki.fi/restcountries/api/all"
  );

  return response.data;
};
