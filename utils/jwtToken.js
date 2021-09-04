const sendToken = (user, statusCode, res) => {

    // Create Jwt token
    const token = user.getJwtToken();


    // Write response
 
    res.status(statusCode).json({
        success: true,
        user,
        token
    })
    
   
}

module.exports = sendToken;