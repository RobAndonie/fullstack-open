import { addNumber, updateNumber } from "../services/server";
import { useState } from "react";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      if (
        window.confirm(
          `${newName} is already on the phonebook. Do you want to update the number?`
        )
      ) {
        const oldPerson = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        const updatedPerson = { ...oldPerson, number: newNumber };

        updateNumber(oldPerson.id, updatedPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      addNumber(newPerson)
        .then((addedPerson) => {
          setPersons(persons.concat(addedPerson));
        })
        .catch((error) => console.log(error));
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name: </label>
        <input id="name" value={newName} onChange={handleNameChange} />
      </div>

      <div>
        <label htmlFor="number">Number: </label>
        <input id="number" value={newNumber} onChange={handleNumberChange} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
