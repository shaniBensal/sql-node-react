import axios from "axios";
const baseUrl = "http://localhost:3000/api/contacts";

const httpReq = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

function getAllContacts() {
  return httpReq.get(baseUrl);
}

function createNewContact(contact) {
  return httpReq.post(baseUrl, {contact});
}

function updateContact(contact) {
  return httpReq.post(baseUrl + "/"+ contact.id , {contact});
}

function deleteSpesificContact(contactId) {
  httpReq.delete(baseUrl + "/" + contactId);
}

export default {
  getAllContacts,
  createNewContact,
  updateContact,
  deleteSpesificContact,
};
