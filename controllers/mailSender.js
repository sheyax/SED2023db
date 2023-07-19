const nodemailer = require("nodemailer");
require("dotenv").config();
const router = require("express").Router();
var Mailgen = require("mailgen");

router.post("/mailsender", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAILPASS, // naturally, replace both with your real credentials or an application-specific password
    },
  });

  var mailGenerator = new Mailgen({
    theme: "default",
    product: {
      // Appears in header & footer of e-mails
      name: "Mailgen",
      link: "https://mailgen.js/",
      // Optional product logo
      // logo: 'https://mailgen.js/img/logo.png'
    },
  });

  // Mail body
  var email = {
    body: {
      name: "SED2023",
      intro: "Welcome to SED2023 we are excited to have you join us ",
      // action: {
      //     instructions: 'To get started with Mailgen, please click here:',
      //     // button: {
      //     //     color: '#22BC66', // Optional action button color
      //     //     text: 'Confirm your account',
      //     //     link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
      //     // }
      // },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  // Generate an HTML email with the provided contents
  var emailBody = mailGenerator.generate(email);

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  var emailText = mailGenerator.generatePlaintext(email);

  const mailOptions = {
    from: "saxdamee@gmail.com",
    to: "saxdasax@gmail.com",
    subject: "Invoices due",
    html: emailBody,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).json({ error });
    } else {
      console.log("Email sent: " + info.response);
      return res.status(201).json({
        msg: "you should receive an email",
      });
    }
  });
});

module.exports = router;
