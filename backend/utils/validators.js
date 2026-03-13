const Joi = require("joi")

exports.registerSchema = Joi.object({

    name: Joi.string().required(),

    email: Joi.string().email().required(),

    password: Joi.string().min(6).required(),

    role: Joi.string().valid("customer", "vendor").default("customer")

})

exports.loginSchema = Joi.object({

    email: Joi.string().email().required(),

    password: Joi.string().required()

})

exports.storeSchema = Joi.object({
    name: Joi.string().required(),

    description: Joi.string().allow(""),

    logo: Joi.string().allow(""),

    banner: Joi.string().allow("")
})

exports.productSchema = Joi.object({
    
    name: Joi.string().required(),

    description: Joi.string().allow(""),

    price: Joi.number().required(),
    
    discountPrice: Joi.number().optional(),

    category: Joi.string().required(),

    stock: Joi.number().optional(),

})