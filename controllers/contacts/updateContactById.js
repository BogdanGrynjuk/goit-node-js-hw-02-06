const { Contact } = require("../../models/contacts/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const updateContactById = async (req, res, next) => {
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

module.exports = ctrlWrapper(updateContactById);
