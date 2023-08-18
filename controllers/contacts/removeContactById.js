const { Contact } = require("../../models/contact/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const removeContactById = async (req, res, next) => {
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

module.exports = ctrlWrapper(removeContactById);
