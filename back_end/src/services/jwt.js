// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1800s",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1y" });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
