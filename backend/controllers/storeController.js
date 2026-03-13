const storeService = require("../services/storeService")

exports.createStore = async (req, res, next) =>{
    console.log("Controller reached")
    try {
        const store = await storeService.createStore(req.body, req.user.id)

        res.status(201).json({
            success: true,
            data: store
        })
    } catch (error) {
        next(error)
    }
}
exports.updateStore = async (req, res, next) =>{
    try {
        const store = await storeService.updateStore(
            req.params.id,
            req.user.id,
            req.body
        )
        res.json({
            success: true,
            data: store
        })
    } catch (error) {
        next(error)
    }
}
exports.getMyStore = async (req, res, next) =>{
    try {
        const store = await storeService.getVendorStore(req.user.id)

        res.json({
            success: true,
            data: store
        })
    } catch (error) {
        next(error)
    }
}
exports.getStore = async (req, res, next) =>{
    try {
        const store = await storeService.getStoreById(req.params.id)

        res.json({
            success: true,
            data: store
        })
    } catch (error) {
        next(error)
    }
}
exports.getPerformance = async (req, res, next) =>{
    try {
        const data = await storeService.getStorePerformance(req.params.id)
        res.json({
            success: true,
            data
        })
    } catch (error) {
        next(error)
    }
}