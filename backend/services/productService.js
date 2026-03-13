const Product = require("../models/Product")
const Store = require("../models/Store")

exports.createProduct = async (data, vendorId) => {

    const store = await Store.findOne({owner:vendorId})

    if(!store){
        throw new Error("Vendor store not found")
    }

    const product = new Product({
        ...data,
        vendor: vendorId,
        store: store._id
    })
    return await product.save()
}

exports.getProducts = async () =>{
    return await Product.find().populate("store").populate("vendor")
}

exports.getProductById = async (id) => {

    const product = await Product.findById(id)

    if(!product){

        throw new Error ("Product not found")
    } 
    return product
}

exports.updateProduct = async (id, data, vendorId) =>{
    const product = await Product.findById(id)
    
    if(!product) {
        throw new Error ("Product not found")
    }
    if( product.vendor.toString() !== vendorId){
        throw new Error("Unauthorized")
    }
    Object.assign(product, data)

    return await product.save()
}
exports.deleteProduct = async (id,vendorId) =>{

    const product = await Product.findById(id)

    if(!product){
        throw new Error ("Product not found")
    }
    if(product.vendor.toString() !==vendorId){
        throw new Error ("Unauthorized")
    }
    await product.deleteOne()
    return {messsage: "Product deleted successfully"}
}
exports.updateStock = async (id, stock, vendorId) => {

    const product = await Product.findById(id)
    if (!product){
        throw new Error (" Product not found")
    }
    if(product.vendor.toString !==vendorId){
        throw new Error ("Unauthorized")
    }
    product.stock = stock
}