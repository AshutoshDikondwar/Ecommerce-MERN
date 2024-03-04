import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Please Enter Your Name"], maxLength: [30, "Name cannot Exceed 30 characters"], minLength: [3, "Name should have more than 3 characters"] },
    email: { type: String, required: [true, "Please Enter Your Email"], unique: true, validate: [validator.isEmail, "Please Enter a Valid Email"] },
    password: { type: String, required: [true, "Please Enter Your password"], minLength: [6, "Password should be greater than 6 characters"], select: false },
    avatar: { public_id: { type: String, required: true }, url: { type: String, required: true }, },
    role: { type: String, default: "user" },
    createdAt: { type: Date, default: Date.now },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})


//JWT TOKEN generating
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

};


// generating password reset token
userSchema.methods.getResetPasswordToken = function () {
    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex")

    //hashing and adding to userschema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

    return resetToken
}




const UserModel = mongoose.model('User', userSchema)

export default UserModel