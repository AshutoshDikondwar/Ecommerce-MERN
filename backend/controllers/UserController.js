import User from '../models/UserModules.js'
import sendToken from '../utils/JwtToken.js';
import sendEmail from '../utils/sendEmail.js'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import cloudinary from 'cloudinary'



//regester a user
const registerUser = async (req, res) => {
    try {
        console.log("object1");
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        })
        console.log("object2");
        const { name, email, password } = req.body
        
        console.log("object3");
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("object3");
        
        
        const user = await User.create({ name, email, password: passwordHash, avatar: { public_id: myCloud.public_id, url: myCloud.secure_url } })
        console.log("object4");

        sendToken(user, 201, res)

    } catch (err) {
        if (err.name === "CastError") {
            const message = `Resource not Found invalid: ${err.path}`
            res.status(500).json(message)
        }
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
            res.status(400).json(message)
        }
        if (err.code === "JsonWebTokenError") {
            const message = `Json web token is Invalid, try again`
            res.status(400).json(message)
        }
        if (err.code === "TokenExpiredError") {
            const message = `Json web token is Expire, try again`
            res.status(400).json(message)
        }
        res.status(500).json(err.message)
    }
}

//login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please Enter Email And Password"
            })
        }
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }
        sendToken(user, 200, res);

    } catch (err) {
        if (err.name === "CastError") {
            const message = `Resource not Found invalid: ${err.path}`
            res.status(500).json(message)
        }
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
            res.status(400).json(message)
        }
        if (err.code === "JsonWebTokenError") {
            const message = `Json web token is Invalid, try again`
            res.status(400).json(message)
        }
        if (err.code === "TokenExpiredError") {
            const message = `Json web token is Expire, try again`
            res.status(400).json(message)
        }
        res.status(500).json(err.message)

    }
}

const logOutUser = async (req, res) => {
    try {
        //here we are setting value of cookie to null
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            message: "Logged Out"
        })
    } catch (err) {
        if (err.name === "CastError") {
            const message = `Resource not Found invalid: ${err.path}`
            res.status(500).json(message)
        }
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
            res.status(400).json(message)
        }
        if (err.code === "JsonWebTokenError") {
            const message = `Json web token is Invalid, try again`
            res.status(400).json(message)
        }
        if (err.code === "TokenExpiredError") {
            const message = `Json web token is Expire, try again`
            res.status(400).json(message)
        }
        res.status(500).json(err.message)
    }
}

const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        //get reser password token
        const resetToken = user.getResetPasswordToken()
        //in resetToken there is without hashed token
        //and in usermodel we saved hashed token
        // console.log(resetToken);
        await user.save({ validateBeforeSave: false })
        // console.log(user.resetPasswordToken);

        // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
        const resetPasswordUrl = `${req.protocol}://${req.get(
            "host"
          )}/password/reset/${resetToken}`;
        // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

        const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this then, please ignore it`


        try {
            await sendEmail({
                email: user.email,
                subject: "Ecommerce Password Recovery",
                message,
            })
            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} successfully`
            })

        } catch (err) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined

            await user.save({ validateBeforeSave: false })

            return res.status(500).json({
                success: false,
                message: err.message
            })
        }


    } catch (err) {
        if (err.name === "CastError") {
            const message = `Resource not Found invalid: ${err.path}`
            res.status(500).json(message)
        }
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
            res.status(400).json(message)
        }
        if (err.code === "JsonWebTokenError") {
            const message = `Json web token is Invalid, try again`
            res.status(400).json(message)
        }
        if (err.code === "TokenExpiredError") {
            const message = `Json web token is Expire, try again`
            res.status(400).json(message)
        }
        res.status(500).json(err.message)
    }
}

const resetPassword = async (req, res) => {
    try {
        //creating token hash
        // console.log(req.params.token);
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
        // console.log(resetPasswordToken);
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        })
        // console.log(user);
        // console.log(user.resetPasswordToken);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Reset Password token is invalid or has been expired"
            })
        }
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password does not match confirm password"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        user.password = passwordHash
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save()
        sendToken(user, 200, res)
    } catch (err) {
        if (err.name === "CastError") {
            const message = `Resource not Found invalid: ${err.path}`
            res.status(500).json(message)
        }
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
            res.status(400).json(message)
        }
        if (err.code === "JsonWebTokenError") {
            const message = `Json web token is Invalid, try again`
            res.status(400).json(message)
        }
        if (err.code === "TokenExpiredError") {
            const message = `Json web token is Expire, try again`
            res.status(400).json(message)
        }
        res.status(500).json(err.message)
    }
}

//get user details//getting our profile account details or user details
const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id) //we have saved user details in req.user in file auth.js
        console.log(req.user.id)
        res.status(200).json({ success: true, user })
    } catch (err) {
        res.status(500).json(err.message)

    }
}

//update user password
const updateUserPassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("+password") //we have saved user details in req.user in file auth.js
        const isMatched = await bcrypt.compare(req.body.oldPassword, user.password)

        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect"
            })
        }
        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password does not matched"
            })
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(req.body.newPassword, salt);
        user.password = passwordHash
        await user.save()
        sendToken(user, 200, res)
    } catch (err) {
        res.status(500).json(err.message)

    }
}
//update user profile
const updateUserProfile = async (req, res) => {
    try {
        const newUserData = { name: req.body.name, email: req.body.email }

        if (req.body.avatar !== "") {
            const user = await User.findById(req.user.id)

            const imageId = user.avatar.public_id

            await cloudinary.v2.uploader.destroy(imageId)

            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale"
            })
            newUserData.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }

        const user = await User.findByIdAndUpdate(req.user.id, newUserData, { new: true, runValidators: true, useFindAndModify: false })
        res.status(200).json({ success: true })
    } catch (err) {
        res.status(500).json(err.message)

    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ success: true, users })

    } catch {
        res.status(500).json(err.message)

    }
}
//if admin wants to see details of user
const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `User does not exist with ${req.params.id} id`
            })
        }
        res.status(200).json({ success: true, user })

    } catch {
        res.status(500).json(err.message)

    }
}

//update role -Admin
const updateUserRole = async (req, res) => {
    try {
        const newUserData = { name: req.body.name, email: req.body.email, role: req.body.role }
       
      await User.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true, useFindAndModify: false })
        res.status(200).json({ success: true })
    } catch (err) {
        res.status(500).json(err.message)

    }
}

//delete user -Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `User does not exist with ${req.params.id} id`
            })
        }
        const imageId = user.avatar.public_id

        await cloudinary.v2.uploader.destroy(imageId)
        await user.remove()
        res.status(200).json({ success: true, message: "User deleted successfully" })
    } catch (err) {
        res.status(500).json(err.message)

    }
}



export { registerUser, loginUser, logOutUser, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser }