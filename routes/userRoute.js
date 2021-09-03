const express = require("express");
const router = express.Router();
const { isAuthUser } = require("../middlewares/auth");
const {
    getUser,
    registerPublisherUser,
    registerAdvertiserUser,
    loginUser,
    forgotPassword,
    resetPassword,
    logout
} = require("../controllers/userController");

router.route('/register/publisher').post(registerPublisherUser);
router.route('/register/advertiser').post(registerAdvertiserUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

router.route('/logout').get(logout);

router.route('/me').get(isAuthUser, getUser)


module.exports = router