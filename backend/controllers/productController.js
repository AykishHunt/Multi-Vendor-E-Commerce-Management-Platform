const productService = require("../services/productService")

exports.createProduct = async (req, res, next) => {
    try {
       const product = await productService.createProduct(
        req.body,
        req.user.id
       ) 
       res.status(201).json({
        success: true,
        data: product
       })
    } catch (error) {
        next(error)
    }
}
exports.getProducts = async (req, res,next) =>{
    try {
        const product = await productService.getProducts()
        res.json({
            success: true,
            data: product
        })
    } catch (error) {
        next(error)
    }
}
exports.getProductById = async (req, res, next) =>{
    try {
        const product = await productService.getProductById(req.params.id)
        res.json({
            success: true,
            data: product
        })
    } catch (error) {
        next(error)
    }
}
exports.updateProduct = async (req, res, next) =>{
    try {
        const product = await productService.updateProduct(
            req.params.id,
            req.body,
            req.user.id
        )
        res.json({
            success: true,
            data: product
        })
    } catch (error) {
        next(error)
    } 
}
exports.deleteProduct = async (req, res, next) =>{
    try {
        const result = await productService.deleteProduct(
            req.params.id,
            req.user.id
        )
        res.json({
            success: true,
            data: result
        })
    } catch (error) {
       next(error) 
    }
}
exports.updateStock = async (req, res, next) => {
    try {
       const product = await productService.updateStock(
        req.params.id,
        req.body.stock,
        req.user.id
       )
       res.json({
        success: true,
        data: product
       })
    } catch (error) {
       next(error)     
    }
}