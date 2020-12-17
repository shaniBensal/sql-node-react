import "./App.css";
import { useState, useEffect } from "react";
import ContactList from "./components/contact-list/contact-list";
import defaultContacts from "./data/contactListDefault";
import service from "./service/service";

function App() {
  const [contacts, setContactList] = useState(defaultContacts);
  const [filterBy, setFilter] = useState("");
  const [filterdList, setFilterdList] = useState([]);

  useEffect(() => {
    service.getAllContacts().then((res) => {
      setContactList(() => {
        return res.data.recordset;
      });
    });
  }, []);

  const updateContactList = (updatedContact) => {
    const idx = contacts.findIndex(
      (contact) => contact.id == updatedContact.id
    );
    service.updateContact(updatedContact).then(res => {
      if (res.status == 200) {
      setContactList((prevList) => {
        let newList = [...prevList];
        newList[idx] = updatedContact;
        return newList;
      });
    }
    })
  };

  const saveNewContact = (newContact) => {
    newContact.id = Math.floor(Math.random() * 100);
    console.log(newContact);
    service.createNewContact(newContact).then((res) => {
      console.log(res)
      if (res.status == 200) {
        setContactList((prevList) => {
          let newList = [...prevList];
          newList.push(newContact);
          return newList;
        });
      }
    });
  };

  const removeContact = (contactId) => {
    service.deleteSpesificContact(contactId);
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
      <div className="container align-content-center flex-column">
        <h2>Contacts App</h2>
        <input
          type="text"
          placeholder="Search..."
          className="form-control my-3"
          value={filterBy}
          onChange={(ev) => updateFilter(ev)}
        />
      </div>
      <ContactList
        contacts={filterdList.length ? filterdList : contacts}
        onRemoveContact={(ev) => removeContact(ev)}
        onSaveNewContact={(ev) => saveNewContact(ev)}
        onUpdateContactList={(ev) => updateContactList(ev)}
      />
    </div>
  );
}

export default App;
