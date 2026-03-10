const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require ("jsonwebtoken")
const crypto = require("crypto")
const sendEmail = require("../utils/sendEmail")

const generateToken = (id, role ) => {
    return jwt.sign(
        {id, role}, process.env.JWT_SECRET, {expiresIn: "7d"}
    )
}

exports.register = async (req, res, next) => {
    try {
        const {name, email,password, role } = req.body
        const userExists = await User.findOne({email})
        if (userExists) {
            return res.status(400).json({message: "User already existed"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role})

        res.status(201).json({
            success: true,
            message:"User registered",
            token: generateToken(user._id,user.role)
        })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) =>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({message: "Invalid credenntials"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({message: "Invalid credentials"})
        }
        res.json({
            success: true,
            token: generateToken(user._id, user.role),
            message:"User LOGIN"
        })
    } catch (error) {
        next (error)
    }
}
exports.forgetPassword = async (req, res, next) =>{
    try {
        const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(404).json({message: "User not found"})
    }   

    const resetToken = crypto.randomBytes(20).toString("hex")

    user.resetPasswordToken = resetToken
    user.resetPasswordExpire = Date.now() + 10*60*1000

    await user.save()

    const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/reset-password/${resetToken}`
    const message = `Reset Password: ${resetUrl}`
    await sendEmail (user.email, "Password Reset", message)
    res.json({message: "Reset email sent"})

    } catch (error) {
        next(error)
    }
}
exports.resetPassword = async(req, res, next) =>{
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpire: {$gt:Date.now()}
        })
        if(!user){
            return res.status.json({message: "Invaild or expire"})
        }

        const salt = await bcrypt.genSalt(10)
        user.password= await bcrypt.hash(req.body.password,salt)

        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save()
        res.json({message: "Password reset successful"})

    } catch (error) {
       next(error) 
    }
}