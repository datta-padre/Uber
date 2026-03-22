const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/user.controller");
const middlewares = require("../middlewares/auth.middleware")

router.post("/register", [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({min:3}).withMessage('Last name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],
userController.register
);

router.post("/login",[
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],userController.login
);

router.get("/profile",middlewares.authUser,userController.getUserProfile);

router.get("/logout",middlewares.authUser,userController.logout)


module.exports = router;