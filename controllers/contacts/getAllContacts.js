const { Contact } = require("../../models/contact/contact");
const { ctrlWrapper } = require("../../helpers");

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;

  const skip = (page - 1) * limit;

  const contacts = favorite
    ? await Contact.find({ owner, favorite }, "-createdAt -updatedAt", {
        skip,
        limit,
      })
        .populate("owner", "name email")
        .exec()
    : await Contact.find({ owner }, "-createdAt -updatedAt", {
        skip,
        limit,
      })
        .populate("owner", "name email")
        .exec();

  res.json({
    status: "Success",
    code: res.statusCode,
    data: {
      contacts,
    },
  });
};

module.exports = ctrlWrapper(getAllContacts);
