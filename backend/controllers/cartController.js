const cartService = require("../services/cartService")

exports.addToCart = async (req, res, next) => {
    try {
        const cart = await cartService.addToCart(
            req.user.id,
            req.body.productId,
            req.body.quantity
        )
        res.json({
            success: true,
            data: cart
        })
    } catch (error) {
        next(error)
    }
}
exports.removeFromCart = async (req, res, next) => {

    try {

        const cart = await cartService.removeFromCart(
            req.user.id,
            req.params.productId
        )

        res.json({
            success: true,
            data: cart
        })

    } catch (error) {
        next(error)
    }

}
exports.updateQuantity = async (req, res, next) => {

    try {

        const cart = await cartService.updateQuantity(
            req.user.id,
            req.body.productId,
            req.body.quantity
        )

        res.json({
            success: true,
            data: cart
        })

    } catch (error) {
        next(error)
    }

}