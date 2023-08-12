const { HttpError, ctrlWrapper } = require("../helpers");

const { Contact } = require("../models/contact");

const getAll = async (req, res, next) => {
  const contacts = await Contact.find().exec();
  res.json({
    status: "Success",
    code: res.statusCode,
    data: {
      contacts,
    },
  });
};

const getById = async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await Contact.findById(contactId).exec();

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "Success",
    code: res.statusCode,
    data: {
      contact,
    },
  });
};

const add = async (req, res, next) => {
  const contact = await Contact.create(req.body);

  res.status(201).json({
    status: "Success",
    code: res.statusCode,
    data: {
      contact,
    },
  });
};

const updateById = async (req, res, next) => {
  const contactId = req.params.contactId;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  }).exec();

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "Success",
    code: res.statusCode,
    data: {
      contact: updatedContact,
    },
  });
};

const updateStatusContact = async (req, res, next) => {
  const contactId = req.params.contactId;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  }).exec();

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "Success",
    code: res.statusCode,
    data: {
      contact: updatedContact,
    },
  });
};

const deleteById = async (req, res, next) => {
  const contactId = req.params.contactId;

  const removedContact = await Contact.findByIdAndDelete(contactId).exec();

  if (!removedContact) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "Success",
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
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteById: ctrlWrapper(deleteById),
};
