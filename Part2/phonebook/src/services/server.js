import axios from "axios";

const baseUrl = "/api/persons";

const getNumbers = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const addNumber = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const updateNumber = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson).then((response) => response.data);
};

const deleteNumber = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export { getNumbers, addNumber, updateNumber, deleteNumber };
