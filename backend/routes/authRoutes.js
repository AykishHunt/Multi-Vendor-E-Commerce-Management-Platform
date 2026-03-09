const express = require("express")
const router = express.Router()
const validate = require("../middleware/validate")
const {registerSchema} = require("../utils/validators")

const { register, login} = require("../controllers/authController")

router.post("/register", validate(registerSchema), register)

router.post("/login", login)

module.exports = router