const mongoose = require("mongoose")

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: Number,
    price: Number
})

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [orderItemSchema],
    totalAmount: Number,
    status: {
        type: String, 
        enum: ["Pending", "Processing","Shipped", "Delivered"],
        default: "Pending"
    }
}, {timestamps: true})
module.exports = mongoose.model("Order", orderSchema)