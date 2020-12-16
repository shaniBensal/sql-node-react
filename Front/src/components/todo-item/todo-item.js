import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ContactEdit from "../contact-edit/contact-edit";

export default function TodoItem({ item, onUpdateItem }) {
  const [isEdit, setEdit] = useState(false);

  const toggleEdit = (updatedItem) => {
    if (updatedItem) {
      onUpdateItem(updatedItem);
    }
    setEdit((prev) => !prev);
  };

  return (
    <div className="d-flex">
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {!isEdit ? (
            <tr>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
            </tr>
          ) : (
            <tr>
              <ContactEdit
                item={item}
                onUpadate={(updatedItem) => toggleEdit(updatedItem)}
              />
            </tr>
          )}
        </tbody>
      </Table>
      )
      <ContactEdit
        item={item}
        onUpadate={(updatedItem) => toggleEdit(updatedItem)}
      />
      <Button variant="info">{isEdit ? "Edit" : "Save"}</Button>
    </div>
  );
}
