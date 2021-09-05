const sendToken = (user, statusCode, res) => {

    // Create Jwt token
    const token = user.getJwtToken();

    // Cookie ile işlemler devre dışı bırakıldı
    /*
    const options = {
        expires: new Date(
            Date.now() + process.env.cookie_expires_time *30 * 60 * 1000 //expirestime * 30  minutes
        ),
        httpOnly: true
    }
    */

    // Write response
    res
    .status(statusCode)
    .header({
        "Token": token,
    })
    .json({
        success: true,
        user,
    })
    
   
}

module.exports = sendToken;