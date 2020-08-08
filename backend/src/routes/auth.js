const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  userDetails,
  addItem,
  removeItem,
  userCart,
  clearCart,
} = require("../controllers/authController");

router.get("/cart/:userEmail", userCart);
router.post("/signup", signup);
router.post("/login", login);
router.post("/user", userDetails);
router.patch("/addItem", addItem);
router.patch("/removeItem", removeItem);
router.patch("/clearCart/:userMail", clearCart);

module.exports = router;
