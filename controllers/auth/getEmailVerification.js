const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/user");

const getEmailVerification = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken }).exec();

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  }).exec();

  res.status(200).json({
    status: "Success",
    code: res.statusCode,
    message: "Verification successful",
  });
};

module.exports = ctrlWrapper(getEmailVerification);
