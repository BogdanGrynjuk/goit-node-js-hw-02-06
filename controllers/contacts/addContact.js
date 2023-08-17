const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact/contact");

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const contact = await Contact.create({ ...req.body, owner });

  res.status(201).json({
    status: "Success",
    code: res.statusCode,
    data: {
      contact,
    },
  });
};

module.exports = ctrlWrapper(addContact);
