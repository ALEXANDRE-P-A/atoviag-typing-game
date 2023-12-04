const nodemailer = require("nodemailer");
require("dotenv").config();

const mail = (address, cookie, session, host) => {
  const message = {
    from: process.env.EMAIL_GOOGLE_ACCT,
    to: address,
    subject: "ACCOUNT CERTIFICATION REQUIRED ",
    text: `Thank you very much for the registration. Please access the link below to certify your account and get start to ultilize the app. ${host}/certify/?cookie=${cookie}&session=${session}`
  };

  const smtpConfig = {
    host: process.env.EMAIL_HOST_GOOGLE,
    port: process.env.EMAIL_PORT_GOOGLE,
    secure: true, // gmail: true, iCloud: false
    auth: {
      user: process.env.EMAIL_GOOGLE_ACCT,
      pass: process.env.EMAIL_APP_PASS_GOOGLE
    }
  };

  const transporter = nodemailer.createTransport(smtpConfig);

  transporter.sendMail(message, (err, response) => {
    console.log(err || response);
  });
};

const passchageMail = (address, cookie, session, host) => {
  const message = {
    from: process.env.EMAIL_GOOGLE_ACCT,
    to: address,
    subject: "ACTION REQUIRED FOR PASSWORD CHANGE",
    text: `Please access the link below to change your password.${host}/passwordchange/passchangeaction/?cookie=${cookie}&session=${session}`
  };

  const smtpConfig = {
    host: process.env.EMAIL_HOST_GOOGLE,
    port: process.env.EMAIL_PORT_GOOGLE,
    secure: true, // gmail: true, iCloud: false
    auth: {
      user: process.env.EMAIL_GOOGLE_ACCT,
      pass: process.env.EMAIL_APP_PASS_GOOGLE
    }
  };

  const transporter = nodemailer.createTransport(smtpConfig);

  transporter.sendMail(message, (err, response) => {
    console.log(err || response);
  });
};

module.exports = { mail, passchageMail };