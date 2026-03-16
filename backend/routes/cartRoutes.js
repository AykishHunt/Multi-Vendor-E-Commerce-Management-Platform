const express = require("express")
const router = express.Router()

const cartController = require("../controllers/cartController")
console.log(cartController)
const protect = require("../middleware/authMiddleware")

router.post("/add", protect, cartController.addToCart)
router.delete("/remove/:productId", protect, cartController.removeFromCart)
router.put("/update", protect, cartController.updateQuantity)

module.exports = router
