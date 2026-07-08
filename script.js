require("dotenv").config()

const express = require("express")
const mongoose  = require("mongoose")
const { userRouter } = require("./routeHandlers/user")
const { adminRouter } = require("./routeHandlers/admin")

const app = express()

app.use(express.json())

app.use("/shricourse/v1/user", userRouter)
app.use("/shricourse/v1/admin", adminRouter)

async function main(){
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    console.log("DATABASE CONNECTED!")
    app.listen(3000)
}

main()