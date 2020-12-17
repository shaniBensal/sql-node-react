import React, {useState} from "react";
import TodoItem from "../contact-item/contact-item";
import { Button } from "react-bootstrap";
import ContactEdit from "../contact-edit/contact-edit";

export default function TodoList({ contacts, onUpdateContactList, onSaveNewContact, onRemoveContact }) {
  const [showNewInput, setNewContact] = useState(false);

  const saveNewContact = (contact) => {
    onSaveNewContact(contact);
    setNewContact(false)
  }

  const list = contacts.map((contact) => {
    return (
      <TodoItem
      key={contact.id}
        item={contact}
        onUpdateItem={(contact) => onUpdateContactList(contact)}
        onRemoveContact={(ev) => onRemoveContact(contact.id)}
      />
    );
  });
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
      {contacts ? list : <p>No items yet</p>}
      {showNewInput ? <ContactEdit item={null} onUpdateItem={(ev)=> saveNewContact(ev)}/> : <tr></tr>}
        </tbody>
      </table>
      <Button variant="info" onClick={()=>setNewContact(prev => !prev)}>{showNewInput? 'Cancel': 'Add New' }</Button>
    </div>
  );
}
