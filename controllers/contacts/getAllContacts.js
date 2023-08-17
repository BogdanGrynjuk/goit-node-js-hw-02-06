const { Contact } = require("../../models/contact/contact");
const { ctrlWrapper } = require("../../helpers");

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const contacts = await Contact.find({ owner }).exec();
  res.json({
    status: "Success",
    code: res.statusCode,
    data: {
      contacts,
    },
  });
};

module.exports = ctrlWrapper(getAllContacts);
