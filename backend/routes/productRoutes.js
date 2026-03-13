const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

router.post("/",authMiddleware,roleMiddleware("vendor"),productController.createProduct)

router.get("/",productController.getProducts)

router.get("/:id",productController.getProductById)

router.put("/:id",authMiddleware,roleMiddleware("vendor"),productController.updateProduct)

router.delete("/:id",authMiddleware,roleMiddleware("vendor"),productController.deleteProduct)

router.patch("/:id/stock",authMiddleware,roleMiddleware("vendor"),productController.updateStock)

module.exports = router