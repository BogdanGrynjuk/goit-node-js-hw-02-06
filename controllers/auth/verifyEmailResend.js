const { HttpError, ctrlWrapper, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");

const BASE_URL = process.env.BASE_URL;

const verifyEmailResend = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    throw HttpError(400, "missing required field email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `
      <p>To confirm your registration, please click on the link below:</p>
      <a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify email</a>
    `,
    text: `
      To confirm your registration, please click on the link below:\n
      ${BASE_URL}/api/auth/verify/${user.verificationToken}
    `,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    status: "Success",
    code: res.statusCode,
    message: "Verification email sent",
  });
};

module.exports = ctrlWrapper(verifyEmailResend);
