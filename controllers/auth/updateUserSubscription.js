const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const updateUserSubscription = async (req, res, next) => {
  const { _id } = req.user;

  const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).exec();

  if (!updatedUser) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    status: "Success",
    code: res.statusCode,
    data: {
      user: updatedUser,
    },
  });
};

module.exports = ctrlWrapper(updateUserSubscription);
