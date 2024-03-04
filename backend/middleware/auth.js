import jwt from "jsonwebtoken"
import User from "../models/UserModules.js"
//here we are finding that the user is authorized or not
const isAuthenticatedUser = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "please Login To Access this Resource"
            })
        }
        const decodeData = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decodeData.id) //here we are decoding the token from cookie and from that cookie we are sending id of the user from that id we know that this user is authirized
        next()
    } catch (err) {
        res.status(500).json(err.message)
    }

}

const authirizedRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Role:${req.user.role} is not allowed to access this resource`
            })
        }
        next()
    }
}
export { isAuthenticatedUser, authirizedRole }