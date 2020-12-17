import React, {useState} from "react";
import ContactItem from "../contact-item/contact-item";
import { Button } from "react-bootstrap";
import ContactEdit from "../contact-edit/contact-edit";

export default function ContactList({ contacts, onUpdateContactList, onSaveNewContact, onRemoveContact }) {
  const [showNewInput, setNewContact] = useState(false);

  const saveNewContact = (contact) => {
    onSaveNewContact(contact);
    setNewContact(false)
  }

  const list = contacts.map((contact) => {
    return (
      <ContactItem
      key={contact.id}
        item={contact}
        onUpdateItem={(contact) => onUpdateContactList(contact)}
        onRemoveContact={(ev) => onRemoveContact(contact.id)}
      />
    );
  });
  return (
    <div className="d-flex flex-column align-items-center pt-3">
      <table>
        <thead>
          <tr>
            <th className="pr-2"><p>First Name</p></th>
            <th className="pr-2"><p>Last Name</p></th>
            <th><p> Actions</p></th>
          </tr>
        </thead>
        <tbody>
      {contacts ? list : <p>No items yet</p>}
      {showNewInput ? <ContactEdit item={null} onUpdateItem={(ev)=> saveNewContact(ev)}/> : <tr></tr>}
        </tbody>
      </table>
      <Button variant="info" className="mt-3" onClick={()=>setNewContact(prev => !prev)}>{showNewInput? 'Cancel': 'Add New' }</Button>
    </div>
  );
}
