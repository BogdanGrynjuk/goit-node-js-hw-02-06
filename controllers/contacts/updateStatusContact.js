const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const updateStatusContact = async (req, res, next) => {
  const contactId = req.params.contactId;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  }).exec();

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    status: "Success",
    code: res.statusCode,
    data: {
      contact: updatedContact,
    },
  });
};

module.exports = ctrlWrapper(updateStatusContact);
