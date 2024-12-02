import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Contacts from "./components/Contacts";
import Notification from "./components/Notification";
import { getNumbers } from "./services/server";
import { useState, useEffect } from "react";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    getNumbers()
      .then((numbers) => setPersons(numbers))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={message} />

      <Filter search={search} setSearch={setSearch} />

      <h2>Add a new contact</h2>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} />

      <h2>Numbers</h2>
      <Contacts persons={persons} setPersons={setPersons} search={search} />
    </div>
  );
};

export default App;
