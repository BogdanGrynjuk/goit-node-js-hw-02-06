const { HttpError, ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact/contact");

const getContactById = async (req, res, next) => {
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

module.exports = ctrlWrapper(getContactById);
