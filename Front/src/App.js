import "./App.css";
import { useState } from "react";
import TodoList from "./components/todo-list/todo-list";
import defaultContacts from "./data/todoListDefault";

function App() {
  const [contacts, setContactList] = useState(defaultContacts);
  const [filterBy, setFilter] = useState("");
  const [filterdList, setFilterdList] = useState([]);

  const updateContactList = (updatedContact) => {
    const idx = contacts.findIndex(
      (contact) => contact.id == updatedContact.id
    );
    setContactList((prevList) => {
      let newList = [...prevList];
      newList[idx] = updatedContact;
      return newList;
    });
  };

  const saveNewContact = (newContact) => {
    newContact.id = Math.floor(Math.random() * 100);
    setContactList((prevList) => {
      let newList = [...prevList];
      newList.push(newContact);
      return newList;
    });
  };

  const removeContact = (contactId) => {
    setContactList((prevList) => {
      let newList = [...prevList];
      return newList.filter((contact) => {
        if (contact.id !== contactId) return contact;
      });
    });
  };

  const updateFilter = (ev) => {
    setFilter(() => ev.target.value);
    setFilterdList(() => {
      let list = [...contacts];
      const str = ev.target.value;
      if (str !== "") {
        const newList = list.filter((item) => {
          if (item.firstName.includes(str) || item.lastName.includes(str))
            return item;
        });
        return newList;
      } else {
        return [];
      }
    });
  };

  return (
    <div className="App pt-3">
      <h2>Contacts App</h2>
      <input value={filterBy} onChange={(ev) => updateFilter(ev)} />
      <TodoList
        contacts={filterdList.length ? filterdList : contacts}
        onRemoveContact={(ev) => removeContact(ev)}
        onSaveNewContact={(ev) => saveNewContact(ev)}
        onUpdateContactList={(ev) => updateContactList(ev)}
      />
    </div>
  );
}

export default App;
