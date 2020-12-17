import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import ContactEdit from "../contact-edit/contact-edit";

export default function TodoItem({ item, onUpdateItem, onRemoveContact }) {
  const [isEdit, setEdit] = useState(false);

  const toggleEdit = (updatedItem) => {
    if (updatedItem) {
      onUpdateItem(updatedItem);
    } 
    setEdit((prev) => !prev);
  };

  return (
    <Fragment>
      {isEdit ? (
        <ContactEdit
          item={item}
          onUpdateItem={(updatedItem) => toggleEdit(updatedItem)}
        />
      ) : (
        <tr>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>
            <Button onClick={(event) => toggleEdit(null)}>Edit</Button>
            <Button onClick={ev => onRemoveContact(item.id)}>Delete</Button>
          </td>
        </tr>
      )}
    </Fragment>
  );
}
