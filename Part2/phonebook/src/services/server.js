import axios from "axios";

const getNumbers = () => {
  return axios
    .get("http://localhost:3001/persons")
    .then((response) => response.data);
};

const addNumber = (newPerson) => {
  return axios
    .post("http://localhost:3001/persons", newPerson)
    .then((response) => response.data);
};

const updateNumber = (id, newPerson) => {
  return axios
    .put(`http://localhost:3001/persons/${id}`, newPerson)
    .then((response) => response.data);
};

const deleteNumber = (id) => {
  return axios
    .delete(`http://localhost:3001/persons/${id}`)
    .then((response) => response.data);
};

export { getNumbers, addNumber, updateNumber, deleteNumber };
