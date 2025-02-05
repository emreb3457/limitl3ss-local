const Users = require("../models/users")
const Company = require("../models/company")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendMail');
const crypto = require('crypto');
const { CLIENT_URL } = require("../constants/appConstants");

// Register a publisherUser   => /api/register/publisher
exports.registerPublisherUser = catchAsyncErrors(async (req, res, next) => {
    const {
        password,
        confirmPassword,
        experience,
        trafficsource,
        volume,
        referance,
        networks
    } = req.body;

    const questions = {
        experience,
        trafficsource,
        volume,
        referance,
        networks
    }
    req.body.questions = questions
    if (password !== confirmPassword) {
        return next(new ErrorHandler('Passwords do not match', 400))
    }
    req.body.role = "publisher"
    const user = new Users(req.body)
    req.body.user = user._id

    await Company.create(req.body)
    await user.save()
    sendToken(user, 200, res)
})

// Register a advertiserUser   => /api/register/advertiser
exports.registerAdvertiserUser = catchAsyncErrors(async (req, res, next) => {
    const {
        password,
        confirmPassword,
        productInfo,
        countryofdelivery,
        productionLine,
        otherAffiliateplatforms
    } = req.body;

    const questions = {
        productInfo,
        countryofdelivery,
        productionLine,
        otherAffiliateplatforms
    }
    req.body.questions = questions

    if (password !== confirmPassword) {
        return next(new ErrorHandler('Passwords do not match', 400))
    }
    req.body.role = "advertiser"
    const user = new Users(req.body)
    req.body.user = user._id

    await Company.create(req.body)
    await user.save()
    sendToken(user, 200, res)
})

// Login User  =>  /api/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    const user = await Users.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
    const isPassMatched = await user.comparePassword(password);
    if (!isPassMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    sendToken(user, 200, res, req)

})

// Update user profile   =>   /api/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const {
        firstname,
        lastname,
        nickname,
        email,
        contactnumber,
        experience,
        trafficsource,
        volume,
        referance,
        networks
    } = req.body


    const updateuser = await Users.findByIdAndUpdate(req.user.id,
        firstname,
        lastname,
        nickname,
        email,
        contactnumber,
        experience,
        trafficsource,
        volume,
        referance,
        networks
        , {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
    res.status(200).json({
        success: true,
        updateuser
    })
})

// Update avatar profile   =>   /api/me/avatar
exports.updateAvatar = catchAsyncErrors(async (req, res, next) => {

    if (!req.file) {
        next(new ErrorHandler("File upload failed", 501))
    }
    const newpath = req.file.path.slice(6)
    const updateuser = await Users.findByIdAndUpdate(req.user.id, { 'avatar.url': newpath }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        updateuser
    })
})

// Update remove avatar profile   =>   /api/me/avatar
exports.removeAvatar = catchAsyncErrors(async (req, res, next) => {

    const updateuser = await Users.findByIdAndUpdate(req.user.id, { 'avatar.url': "" }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        updateuser
    })
})

// Forgot Password   =>  /api/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await Users.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });
    // Create reset password url
    const resetUrl = `${req.protocol}://${CLIENT_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\n`

    try {

        await sendEmail({
            email: user.email,
            subject: 'Limitl3ss Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))
    }

})

// Reset Password   =>  /api/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await Users.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: `Password changed please login `
    })

})



// Logout user   =>   /api/logout
exports.logout = catchAsyncErrors(async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

// Get user => /api/me  //test
exports.getUser = (async (req, res, next) => {

    const user = await Users.findById(req.user.id)

    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }
    res.status(200).json({
        succes: true,
        user
    })

})
