
const express = require('express');
const router = express.Router();
const signupController = require("../controller/signupControler");
const extractUserFromToken = require("../middleware/extractToken")
const checkPassword = require("../middleware/password")

router.get("/signupPage", signupController.GetSignupPage);               // go to signup page
router.get("/close", signupController.close);                           // close button in signup button
router.post("/login",checkPassword, signupController.login);              // go to login page 
router.post("/MainLayout",checkPassword, signupController.MainLayout);    // go to main layout page
router.get("/profile",extractUserFromToken, signupController.profile);           // go to profile

router.get("/logout", signupController.logout);             // logout button in main layout page

module.exports = router;
