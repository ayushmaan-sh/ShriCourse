require("dotenv").config()

const jwt = require("jsonwebtoken")

const adminMiddleware = async (req, res, next) => {
    const token = req.headers.token

    try {
        const decodedData = await jwt.verify(token, process.env.ADMIN_JWT_PASSKEY)

        if(decodedData){
            req.adminId = decodedData.id
            next()
        } else {
            return res.json({
                message: "ERROR: Wrong Token Input!"
            })
        }

    } catch (error) {
        return res.json({
            message: "Something went wrong!"
        })
    }
}

module.exports = {
    adminMiddleware: adminMiddleware
}
