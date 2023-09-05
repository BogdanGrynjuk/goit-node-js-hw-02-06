const bcryptjs = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { HttpError, ctrlWrapper, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");

const BASE_URL = process.env.BASE_URL;

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `
      <p>To confirm your registration, please click on the link below:</p>
      <a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify email</a>
    `,
    text: `
      To confirm your registration, please click on the link below:\n
      ${BASE_URL}/api/auth/verify/${verificationToken}
    `,
  };

  await sendEmail(verifyEmail);

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
