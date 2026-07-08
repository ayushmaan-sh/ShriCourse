require("dotenv").config()

const { Router } = require("express")
const jwt = require("jsonwebtoken")
const { userModel, purchaseModel, courseModel } = require("../database")
const { userMiddleware } = require("../middlewares/userMiddleware")
const userRouter = Router()

userRouter.post("/signup", async (req, res) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password

    try {
        const checkExistingUser = await userModel.findOne({
            email: email
        })

        if (!checkExistingUser) {
            await userModel.create({
                email: email,
                username: username,
                password: password
            })

            res.json({
                message: "You are signed up!"
            })
        } else {
            return res.json("This email is already registered.")
        }

    } catch (error) {
        res.status(403).send({
            message: "Something went wrong!"
        })
    }
})

userRouter.post("/signin", async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    try {
        const user = await userModel.findOne({
            email: email
        })

        if (user) {
            const checkPassword = user.password === password

            if (checkPassword) {
                const token = jwt.sign({
                    id: user._id
                }, process.env.USER_JWT_PASSKEY)

                return res.json({
                    token: token
                })
            } else {
                return res.json({
                    message: "Wrong Password!"
                })
            }
        } else {
            return res.json("User not found! Signup.")
        }

    } catch (error) {
        return res.status(403).send({
            message: "Something went wrong"
        })
    }
})

userRouter.post("/purchase", userMiddleware, async (req, res) => {
    const userId = req.userId
    const courseId = req.body.courseId

    await purchaseModel.create({
        userId: userId,
        courseId: courseId
    })

    res.json({
        message: "You have successfully bought the course"
    })
})

userRouter.get("/mycourse", userMiddleware, async (req, res) => {
    const userId = req.userId

    try {
        const purchases = await purchaseModel.find({ userId: userId })

        const listCourseIds = purchases.map(p => p.courseId)

        const courses = await courseModel.find({
            _id: { $in: listCourseIds }
        })

        res.json({
            courses
        })

    } catch (error) {
        res.json({
            message: "Something went wrong!"
        })
    }
})



module.exports = {
    userRouter: userRouter
}
