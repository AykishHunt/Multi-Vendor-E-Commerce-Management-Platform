const express =require("express")
const dotenv =require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db")
const errorHandler = require("./middleware/errorHandler")

dotenv.config()

const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log("Request:", req.method, req.url)
    next()
})

app.get("/", (req, res) => {
    res.send("API Running......")
})

const authRoutes = require ("./routes/authRoutes")

app.use("/api/auth", authRoutes)

const storeRoutes= require("./routes/storeRoutes")

app.use("/api/store", storeRoutes)

const productRoutes = require("./routes/productRoutes")
app.use("/api/products", productRoutes)

app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, () =>{
    console.log(`server running port ${PORT}`)
})
