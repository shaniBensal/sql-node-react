import React from "react";

const ContactEdit = ({ item }) => {
  return (
    <div>
      {!!item ? (
        <form>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              value={item.firstName}
              name="firstName"
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" name="lastName" />
          </div>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};
export default ContactEdit;
