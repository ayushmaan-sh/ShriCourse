require("dotenv").config()

const { Router } = require("express")
const jwt = require("jsonwebtoken")
const { adminModel, courseModel } = require("../database")
const { adminMiddleware } = require("../middlewares/adminMiddleware")
const adminRouter = Router()

adminRouter.post("/signup", async (req, res) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password

    try {
        const checkExistingUser = await adminModel.findOne({
            email: email
        })

        if (!checkExistingUser) {
            await adminModel.create({
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

adminRouter.post("/signin", async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    try {
        const admin = await adminModel.findOne({
            email: email
        })

        if (admin) {
            const checkPassword = admin.password === password

            if (checkPassword) {
                const token = jwt.sign({
                    id: admin._id
                }, process.env.ADMIN_JWT_PASSKEY)

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

adminRouter.post("/createcourse", adminMiddleware, async (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const adminId = req.adminId

    try {
        const course = await courseModel.create({
            title: title,
            description: description,
            price: price,
            adminId: adminId
        })

        res.json({
            message: "Course Created!",
            courseId: course._id
        })

    } catch (error) {
        console.log(error)
        return res.json({
            message: "Something went wrong!"
        })
    }

})

adminRouter.put("/editcourse", adminMiddleware, async (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const courseId = req.body.courseId
    const adminId = req.adminId

    try {
        const course = await courseModel.updateOne(
            {
                _id: courseId,
                adminId: adminId
            },
            {
                title: title,
                description: description,
                price: price
            }

        )

        if (course.matchedCount === 0) {
            return res.status(404).json({
                message: "Course not found, or you don't have permission to edit it"
            })
        }

        res.json({
            message: `Course ${courseId} Updated`
        })

    } catch (error) {
        console.log(error)
        return res.json({
            message: "Something went wrong!"
        })
    }
})

adminRouter.delete("/deletecourse", adminMiddleware, async (req, res) => {
    const adminId = req.adminId
    const courseId = req.body.courseId

    try {
        const course = await courseModel.deleteOne(
            {
                _id: courseId,
                adminId: adminId
            },
        )

        if (course.matchedCount === 0) {
            return res.status(404).json({
                message: "Course not found, or you don't have permission to delete it"
            })
        } else {
            res.json({
                message: "Course Deleted!"
            })
        }

    } catch (error) {
        console.log(error)
        return res.json({
            message: "Something went wrong!"
        })
    }
})


module.exports = {
    adminRouter: adminRouter
}
