const Cart = require ("../models/Cart")
const Order = require ("../models/Order")

exports.createOrder = async (userId) =>{
    const cart = await Cart.findOne({user: userId})

    if(!cart || cart.items.length === 0){
        throw new Error("Cart is empty")
    }

    const total = cart.items.reduce(
        (sum, item) => sum +item.price * item.quantity, 0 )
    
    const order = await Order.create({
        customer: userId, 
        items:cart.items,
        totalAmount:total
    })
    cart.items = []
    await cart.save()

    return order
}