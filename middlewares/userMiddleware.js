require("dotenv").config()

const jwt = require("jsonwebtoken")

const userMiddleware = async (req, res, next) => {
    const token = req.headers.token

    try {
        const decodedData = await jwt.verify(token, process.env.USER_JWT_PASSKEY)

        if(decodedData){
            req.userId = decodedData.id
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
    userMiddleware: userMiddleware
}
