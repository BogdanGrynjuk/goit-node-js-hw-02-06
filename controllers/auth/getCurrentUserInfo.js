const { ctrlWrapper } = require("../../helpers");

const getCurrentUserInfo = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    status: "Success",
    code: res.statusCode,
    data: {
      currentUser: {
        email,
        subscription,
      },
    },
  });
};

module.exports = ctrlWrapper(getCurrentUserInfo);
