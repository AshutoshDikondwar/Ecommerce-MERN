//creating token and saving cookie //login the user
const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken() //getJWTToken is method in userModules which generates token and 

    //options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    })
}

export default sendToken