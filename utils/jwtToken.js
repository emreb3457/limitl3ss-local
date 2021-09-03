const sendToken = (user, statusCode, res) => {

    // Create Jwt token
    const token = user.getJwtToken();

    // Options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME *30 * 60 * 1000 //expirestime * 30  minutes
        ),
        httpOnly: true
    }

    // Write response
   console.log("girdi")
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user
    })
    
   
}

module.exports = sendToken;