const { required } = require("joi")
const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String
    },
    category:{
        type: String,
        required:true
    },
    price:{
        type: Number, 
        required: true
    },
    discountPrice: {
        type: Number
    },
    stock: {
        type: Number,
        default: 0
    },
    images:
        [
            {type: String}
        ]
    ,
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
}, {timestamps: true})
module.exports = mongoose.model("product",productSchema)