const express = require("express")
const router = express.Router()
const validate = require("../middleware/validate")
const {registerSchema, loginSchema} = require("../utils/validators")

const { register, login, forgetPassword, resetPassword} = require("../controllers/authController")

router.post("/register", validate(registerSchema), register)

router.post("/login", validate(loginSchema) ,login)

router.post("/forget-password", forgetPassword)

router.post("/reset-password/:token", resetPassword)

module.exports = router