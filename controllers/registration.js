const router = require("express").Router();
const nodemailer = require("nodemailer");
require("dotenv").config();
const Mailgen = require("mailgen");

const User = require("../models/users");
const Hackathon = require("../models/hackusers");

// mail sending controller
const mailSender = (usermail, firstname) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAILPASS, // naturally, replace both with your real credentials or an application-specific password
    },
  });

  var mailGenerator = new Mailgen({
    theme: "cerberus",
    product: {
      // Appears in header & footer of e-mails
      name: "SED2023 Team",
      link: "https://mailgen.js/",
      // Optional product logo
      // logo: 'https://mailgen.js/img/logo.png'
    },
  });

  // Mail body
  var email = {
    body: {
      name: firstname,
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
    to: usermail,
    subject: "Sustainable Energy Days 2023",
    html: emailBody,
  };

  // send mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const hackSender = (usermail, firstname) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAILPASS, // naturally, replace both with your real credentials or an application-specific password
    },
  });

  var mailGenerator = new Mailgen({
    theme: "cerberus",
    product: {
      // Appears in header & footer of e-mails
      name: "SED2023 Team",
      link: "https://mailgen.js/",
      // Optional product logo
      // logo: 'https://mailgen.js/img/logo.png'
    },
  });

  // Mail body
  var email = {
    body: {
      name: firstname,
      intro:
        "We are glad to have you at SED2023 Hackathon. We look forwardto seeing your innovative ideas ",
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
    to: usermail,
    subject: "Sustainable Energy Days 2023",
    html: emailBody,
  };

  // send mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
// user registration
router.post("/user/register", async (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city,
    country: req.body.country,
  });

  //Check if email or phone number already exists

  // save user
  result = await user.save();
  const { ...data } = await result.toJSON();

  //Send Email
  mailSender(req.body.email, req.body.firstname);
  res.status(201).json(data);
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(error);
    res.status(500).json({ message: " Server Error" });
  }
});

//get hack users
router.get("/hackers", async (req, res) => {
  try {
    const users = await Hackathon.find();
    res.json(users);
  } catch (err) {
    console.error(error);
    res.status(500).json({ message: " Server Error" });
  }
});

router.post("/hack/register", async (req, res) => {
  const user = new Hackathon({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city,
    country: req.body.country,
  });

  // save user
  result = await user.save();
  const { ...data } = await result.toJSON();

  //Send Email
  hackSender(req.body.email, req.body.firstname);
  res.send(data);
});

module.exports = router;
