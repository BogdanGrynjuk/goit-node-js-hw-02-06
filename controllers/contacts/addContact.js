const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contacts/contact");

const addContact = async (req, res, next) => {
  const contact = await Contact.create(req.body);

  res.status(201).json({
    status: "Success",
    code: res.statusCode,
    data: {
      contact,
    },
  });
};

module.exports = ctrlWrapper(addContact);
