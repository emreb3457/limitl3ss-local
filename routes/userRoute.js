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
    logout,
    updateAvatar,
    removeAvatar,
    updateProfile
} = require("../controllers/userController");

router.route('/register/publisher').post(registerPublisherUser);
router.route('/register/advertiser').post(registerAdvertiserUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

router.route('/logout').get(logout);

router.route('/me').get(isAuthUser, getUser)
router.route('/me/update').put(isAuthUser, updateProfile)
router.route('/me/avatar')
    .post(isAuthUser, updateAvatar)
    .delete(isAuthUser, removeAvatar)


module.exports = router