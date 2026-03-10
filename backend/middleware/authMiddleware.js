const jwt = require("jsonwebtoken")
const authmiddleware= (req, res, next) =>{
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({message: "No Token"})
    }
    const token = authHeader.split("")[1]
    try {
        const deccded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = deccded
        next()
    } catch (error) {
        return res.status(401).json({message: "Invalid token"})
    }
    module.exports =authmiddleware
}