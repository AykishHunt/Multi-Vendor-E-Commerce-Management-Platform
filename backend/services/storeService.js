const { object } = require("joi")
const Store = require("../models/Store")


exports.createStore = async (data, ownerId) =>{
    const existingStore = await Store.findOne({owner: ownerId})
    if (existingStore) {
     throw new Error("Vendor already owns a store")
    }
    const store = await Store.create({
        ...data, owner: ownerId
    })
    return store
}
exports.updateStore =async (storeId, ownerId,data) =>{
    const store = await Store.findOne ({_id: storeId,owner: ownerId})
    if(!store){
        throw new Error("Store not found")
    }
    Object.assign(store, data)
    await store.save()
    return store
}
exports.getVendorStore = async (ownerId) => {
    return await Store.findOne({ owner: ownerId})
}
exports.getStoreById = async (storeId) => {
    return await Store.findById(storeId).populate("owner", "name email")
}
exports.getStorePerformance = async (storeId) => {
    const store = await Store.findById(storeId)
    if(!store){
        throw new Error ("Store not found")
    }
    return {
        totalProducts: store.totalProducts,
        totalOrders: store.totalOrders,
        totalRevenue: store.totalRevenue 
    }
}