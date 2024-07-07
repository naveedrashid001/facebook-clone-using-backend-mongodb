const express = require('express');
const router = express.Router();
const profileController = require("../controller/profileControler");

router.get("/", profileController.login);                    // SHOW login page
// router.post("/create",profileController.loginProfile );      // show your profile 
// router.get("/logout",profileController.logout)            // logout facebook
router.get("/working", profileController.working);           // currently working page
// router.get("/signupPage", profileController.GetSignupPage)   // show signup page

module.exports = router;