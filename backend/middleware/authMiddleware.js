const jwt = require("jsonwebtoken")
const authMiddleware= (req, res, next) =>{
    console.log("Auth middleware reached")
    console.log("Authorization header:", req.headers.authorization)
    console.log("JWT_SECRET:", process.env.JWT_SECRET)
   const authHeader = req.headers.authorization

if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" })
}

const token = authHeader.split(" ")[1]
console.log("Extracted token:", token)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({message: "Invalid token"})
    }
   
}
 module.exports = authMiddleware