const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateContactById = require("./updateContactById");
const updateStatusContact = require("./updateStatusContact");
const removeContactById = require("./removeContactById");

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  updateStatusContact,
  removeContactById,
};
