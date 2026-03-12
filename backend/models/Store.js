const mongoose = require("mongoose")
const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true 
    },
    description: {
        type: String,
        trim: true 
    },
    logo: {
        type: String,
    },
    banner: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",
        unique : true
    },
    isActive :{
        type: Boolean,
        default: true
    },
    totalProducts: {
        type: Number,
        default: 0
    }, 
    totalOrders: {
        type: Number,
        default: 0
    },
    totalRevenue: {
        type: Number,
        default: 0
    }
}, {timestamps: true})
module.exports = mongoose.model("store", storeSchema)