const orderService = require("../services/orderService")
exports.createOrder = async (req, res, next) =>{
    try {
        const order = await orderService.createOrder(req.user.id)
        res.status(201).json({
            success: true,
            data: order
        })
    } catch (error) {
        next(error)
    }
    
}