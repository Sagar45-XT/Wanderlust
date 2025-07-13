const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utility/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controller/users.js");

router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signUp));

router.route("/login")
    .get(userController.userLoginForm)
    .post(saveRedirectUrl,
     passport.authenticate('local', 
    { failureRedirect: '/login', 
      failureFlash: true }), 
      userController.login
    );

router.get("/logout", userController.logout);

module.exports = router;