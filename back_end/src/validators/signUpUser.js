// const { body, validationResult } = require("express-validator");

// const validateSignUpUser = [
//   body("email").notEmpty().isEmail().isLength({ max: 255 }),
//   body("hashedPassword").notEmpty().isLength({ max: 255 }),

//   (req, res, next) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       res.status(422).json({ validationErrors: errors.array() });
//     } else {
//       next();
//     }
//   },
// ];

const validateSignUpUser = (req, res, next) => {
  const regexEmail = /@(gmail\.com|hotmail\.com|.+\.com|.+\.fr)$/i;
  const regexPassword = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{20,55}$/;
  const { password, email } = req.body;
  if (email.match(regexEmail)) {
    if (password.match(regexPassword)) {
      next();
    } else {
      res.status(400).json({ messagePassword: "mot de passe incorrect" });
      console.error("password refusé");
    }
  } else {
    res.status(400).json({ message: "email incorrect" });
    console.error("email refusé");
  }
};

module.exports = {
  validateSignUpUser,
};
