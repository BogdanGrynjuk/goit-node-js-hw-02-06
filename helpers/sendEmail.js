const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const sendEmail = async (data) => {
  const email = { ...data, from: "bgrynjuk@ukr.net" };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
