const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please enter your first name'],
        maxLength: [10, 'Your name cannot exceed 10 characters']
    },
    lastname: {
        type: String,
        required: [true, 'Please enter your last name'],
        maxLength: [10, 'Your name cannot exceed 10 characters']
    },
    nickname: {
        type: String,
        required: [true, 'Please enter your nickname'],
        maxLength: [20, 'Your name cannot exceed 20 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    phonenumber: {
        type: String,
        required: [true, 'Please enter your phone number'],
        maxLength: [11, 'Your name cannot exceed 11 characters']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    role: {
        type: String,
        default: 'user'
    },
    roles: {
        type: String,
        default: 'publisher'
    },
    //About You
    experience: {
        type: String,
        maxLength: [20, 'Your name cannot exceed 11 characters']
    },
    trafficsource: {
        type: String,
        maxLength: [20, 'Your name cannot exceed 11 characters']
    },
    volume: {
        type: String,
        maxLength: [20, 'Your name cannot exceed 11 characters']
    },
    referance: {
        type: String,
        maxLength: [20, 'Your name cannot exceed 11 characters']
    },
    networks: {
        type: String,
    },
    //About You*\
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.jwt_secret, {
        expiresIn: process.env.jwt_expires_time
    });
}

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken

}

module.exports = mongoose.model('publisherUser', userSchema);
