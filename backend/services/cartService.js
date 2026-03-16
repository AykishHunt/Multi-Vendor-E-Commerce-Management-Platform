const Cart = require ("../models/Cart")
const Product = require("../models/Product")

exports.addToCart= async (userId, productId, quantity) =>{

    const product = await Product.findById(productId)
    if(!product) throw new Error("Product not found")
    
    let cart = await Cart.findOne({user: userId})
    if(!cart) {
        cart = new Cart({user: userId, items: []})
    }
    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
    )
    if(itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity
    }else{
        cart.items.push({
            product : productId,
            quantity,
            price: product.price
        })
    }
    await cart.save()
    return cart
}
exports.removeFromCart = async (userId, productId) => {

    const cart = await Cart.findOne({ user: userId })

    if (!cart) {
        throw new Error("Cart not found")
    }

    cart.items = cart.items.filter(
        item => item.product.toString() !== productId
    )

    await cart.save()

    return cart
}
exports.updateQuantity = async (userId, productId, quantity) => {

    const cart = await Cart.findOne({ user: userId })

    if (!cart) {
        throw new Error("Cart not found")
    }

    const item = cart.items.find(
        item => item.product.toString() === productId
    )

    if (!item) {
        throw new Error("Product not in cart")
    }

    item.quantity = quantity

    await cart.save()

    return cart
}