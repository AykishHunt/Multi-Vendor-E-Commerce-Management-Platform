const express = require("express")
const router = express.Router()
const storeController = require("../controllers/storeController")
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")
const validate = require("../middleware/validate")
const {storeSchema} = require("../utils/validators")


router.post("/", (req,res,next)=>{
    console.log("STORE ROUTE HIT")
    next()
}, authMiddleware,
    roleMiddleware("vendor"),
    validate(storeSchema),
    storeController.createStore
)
router.put("/:id", authMiddleware, 
    roleMiddleware("vendor"),
    storeController.updateStore)
router.get("/my-store", authMiddleware,
     roleMiddleware("vendor"),
     storeController.getMyStore)
router.get("/:id/performance", authMiddleware, 
    roleMiddleware("vendor"),
    storeController.getPerformance)
router.get("/:id", storeController.getStore)
module.exports = router