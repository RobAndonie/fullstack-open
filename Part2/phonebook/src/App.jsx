import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Contacts from "./components/Contacts";
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [search, setSearch] = useState("");

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter search={search} setSearch={setSearch} />

      <h2>Add a new contact</h2>
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <Contacts persons={persons} search={search} />
    </div>
  );
};

export default App;
