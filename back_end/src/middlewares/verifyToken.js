const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(401);
    } else {
      req.user = user;
      console.info("User authenticated:", user); // Ajout d'un log pour vérifier l'utilisateur
      next();
    }
  });
};

module.exports = {
  authenticateToken,
};
