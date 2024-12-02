import { deleteNumber } from "../services/server";

const Contacts = ({ persons, setPersons, search }) => {
  const handleDelete = (id) => {
    deleteNumber(id)
      .then((response) => {
        console.log(response);
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <ul>
      {persons
        .filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
        .map((person) => (
          <li key={person.name}>
            <span>{person.name} </span>
            <span>{person.number} </span>
            <button onClick={() => handleDelete(person.id)}>Delete</button>
          </li>
        ))}
    </ul>
  );
};

export default Contacts;
