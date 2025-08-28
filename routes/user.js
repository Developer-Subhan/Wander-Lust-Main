const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post(userController.createUser);

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true,}), userController.loginUser);

router.get("/logout", userController.logoutUser);

module.exports = router;
