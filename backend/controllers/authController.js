exports.register = async (req, res, next) => {
    try {
        res.status(201).json({
            message:"User registered"
        })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) =>{
    try {
        res.json({
            message:"User LOGIN"
        })
    } catch (error) {
        next (error)
    }
}