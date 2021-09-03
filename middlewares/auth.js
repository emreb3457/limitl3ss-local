const publisherUser = require('../models/publisherUser')
const advertiserUser = require('../models/advertiserUser')
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// Checks if user is authenticated or not
exports.isAuthUser = catchAsyncErrors(async (req, res, next) => {

    const { token } = req.body
    

    if (!token) {
        return next(new ErrorHandler('Login first to access this resource.', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await advertiserUser.findById(decoded.id) ?
        await advertiserUser.findById(decoded.id) :
        await publisherUser.findById(decoded.id)

    next()
})