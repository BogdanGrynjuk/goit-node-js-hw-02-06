const { HttpError, ctrlWrapper } = require("../helpers");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

const getAll = async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: res.statusCode,
    data: {
      contacts,
    },
  });
};

const getById = async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "success",
    code: res.statusCode,
    data: {
      contact,
    },
  });
};

const add = async (req, res, next) => {
  const contact = await addContact(req.body);

  res.status(201).json({
    status: "success",
    code: res.statusCode,
    data: {
      contact,
    },
  });
};

const updateById = async (req, res, next) => {
  const contactId = req.params.contactId;

  const updatedContact = await updateContact(contactId, req.body);

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "success",
    code: res.statusCode,
    data: {
      contact: updatedContact,
    },
  });
};

const deleteById = async (req, res, next) => {
  const contactId = req.params.contactId;

  const removedContact = await removeContact(contactId);

  if (!removedContact) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "success",
    code: res.statusCode,
    data: {
      message: "Contact deleted",
    },
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
