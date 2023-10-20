const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD, META_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_EMAIL,
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const email = {
  to: "test3@gmail.com",
  from: META_EMAIL,
  subject: "test email",
  html: "<p><strong>Test email</strong> from localhost:3000</p>",
};

transporter
  .sendMail(email)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));

const sendEmail = async (data) => {
  const email = { ...data, from: META_EMAIL };
  await transporter.sendMail(email);
  return true;
};

module.exports = sendEmail;
