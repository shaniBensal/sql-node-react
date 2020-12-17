import React, { useState } from "react";
import { Button } from "react-bootstrap";

const ContactEdit = ({ item, onUpdateItem }) => {
  const [firstName, setFirstName] = useState(item ? item.firstName : "");
  const [lastName, setLastName] = useState(item ? item.lastName : "");

  const saveChanges = (onUpdateItem) => {
    if(firstName && lastName !== ''){
      let updatedContact = {
        id: item ? item.id : "",
        firstName,
        lastName,
      };
      onUpdateItem(updatedContact);
    } else return
  };

  return (
    <React.Fragment>
      <tr>
        <td>
          <input
            value={firstName}
            name="firstName"
            type="text"
            className="form-control"
            required
            onChange={(ev) => setFirstName(() => ev.target.value)}
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={lastName}
            onChange={(ev) => setLastName(() => ev.target.value)}
            name="lastName"
            required
          />
        </td>
        <td>
          <Button onClick={(event) => saveChanges(onUpdateItem)}>Save</Button>
        </td>
      </tr>
    </React.Fragment>
  );
};
export default ContactEdit;
