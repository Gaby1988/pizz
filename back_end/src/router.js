const express = require("express");

const router = express.Router();

const { hashPassword } = require("./middlewares/hashPassword");
const { validateSignUpUser } = require("./validators/signUpUser");
const pizzaControllers = require("./controllers/pizzaControllers");
const basketControllers = require("./controllers/basketControllers");
const userControllers = require("./controllers/userControllers");
const { authenticateToken } = require("./middlewares/verifyToken");

router.get("/users", userControllers.browse);
router.post(
  "/users",
  validateSignUpUser,
  userControllers.getUserByEmail,
  hashPassword,
  userControllers.postUsers
);

/* test token */
router.post("/token", userControllers.getTokenForUser);
router.post("/refreshToken", userControllers.getRefreshTokenForUser);

/* fin test token */

router.get("/pizzas", pizzaControllers.browse);
router.get("/pizzas_reduction", pizzaControllers.browseWithReduction);
router.get("/pizzas/:id", pizzaControllers.read);
router.put("/pizzas/:id", pizzaControllers.edit);
router.post("/pizzas", pizzaControllers.add);
router.delete("/pizzas/:id", pizzaControllers.destroy);

router.get("/baskets", basketControllers.browse);

// avec middleware token
// router.post("/baskets", authenticateToken, basketControllers.add);
// avec middleware token

router.post("/baskets", basketControllers.add);
router.put("/baskets/:id", basketControllers.editBasket);
router.put("/baskets-down/:id", basketControllers.editBasketDown);

module.exports = router;
