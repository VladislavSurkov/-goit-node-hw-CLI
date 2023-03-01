const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8")
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.log(err.massege));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => JSON.parse(data))
    .then((contacts) => contacts.filter((contact) => contact.id === contactId))
    .then((contact) => console.table(contact))
    .catch((err) => console.log(err.massege));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => JSON.parse(data))
    .then((contacts) => contacts.filter((contact) => contact.id !== contactId))
    .then((contact) => {
      console.table(contact);
      return contact;
    })
    .then((contact) => {
      fs.writeFile(contactsPath, JSON.stringify(contact, null, "\t"), "utf8");
    })
    .catch((err) => console.log(err.massege));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => JSON.parse(data))
    .then((contacts) => {
      const contact = {
        id: (contacts.length + 1).toString(),
        name,
        email,
        phone,
      };
      contacts.push(contact);
      return contacts;
    })
    .then((addContacts) => {
      console.table(addContacts);
      return addContacts;
    })
    .then((contacts) => {
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"), "utf8");
    })
    .catch((err) => console.log(err.massege));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
