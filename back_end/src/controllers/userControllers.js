const models = require("../models");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../services/jwt");

const browse = (req, res) => {
  models.users
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.users
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postUsers = async (req, res, next) => {
  const { email } = req.body;
  const { hashedPassword } = req.body;
  models.users
    .createUser(email, hashedPassword)
    .then((result) => {
      res
        .location(`/users${result.insertId}`)
        .status(201)
        .json({ email, hashedPassword });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getUserByEmail = async (req, res, next) => {
  const { email, password } = req.body;
  models.users
    .findOneByEmail(email)
    .then(([rows]) => {
      if (rows.length > 0 && rows[0].email === email) {
        res.status(409).json({
          message: "Adresse mail déjà utilisée!",
        });
      } else {
        res.locals.password = password;
        next();
      }
    })
    .catch((err) => {
      console.error("Erreur lors de la recherche de l'utilisateur :", err);
      res.status(500).send(err);
    });
};

const getTokenForUser = async (req, res) => {
  const { email, password } = req.body;
  const { id } = req.params;
  models.users.findOneByEmail(email);
  if (!email) {
    res.status(401).send("invalid email");
    return;
  }
  if (!password) {
    res.status(401).send("invalid password");
  }
  const user = { email, id, role_id: "utilisateur2" };
  const accessToken = generateAccessToken(user);
  console.info("gabyTokenGaby:", accessToken);
  res.json({ accessToken });
};

// const getRefreshTokenForUser = async (req, res) => {
//   const authHeader = req.headers.authorization;
//   const authHeader2 = req.headers;
//   const token = authHeader && authHeader.split(" ")[1];
//   console.info("autorisationauthHeader", authHeader2);
//   console.info("gabytokenrefresh authHeader", token);

//   if (!token) {
//     res.sendStatus(401);
//   }

//   try {
//     const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
//     req.user = user;
//     const refresh = generateRefreshToken(user);
//     console.info(refresh);
//     // TODO: Check en base que l'user est toujours existant/autorisé à utiliser la plateforme
//     const userWithoutIatExp = { ...user }; // Créer une copie de l'objet user
//     delete userWithoutIatExp.iat;
//     delete userWithoutIatExp.exp;
//     const refreshedToken = generateAccessToken(userWithoutIatExp);
//     res.send({
//       accessToken: refreshedToken,
//     });
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(401);
//   }
// };

const getRefreshTokenForUser = async (req, res) => {
  // Ici, vous récupérez le token précédemment émis depuis l'entête de la requête
  // const refreshToken = req.headers.authorization.split(" ")[1];
  console.info("split sans tableau, ", req.headers);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403); // Si le token n'est pas valide ou expiré
    }

    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    res.json({ accessToken });
  });
};

module.exports = {
  browse,
  read,
  postUsers,
  getUserByEmail,
  getTokenForUser,
  getRefreshTokenForUser,
};
