const bcryptjs = require("bcryptjs");

const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/user");

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    status: "Success",
    code: res.statusCode,
    data: {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    },
  });
};

module.exports = ctrlWrapper(register);
