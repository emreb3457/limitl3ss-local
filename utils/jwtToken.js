const sendToken = (user, statusCode, res) => {

    // Create Jwt token
    const token = user.getJwtToken();


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