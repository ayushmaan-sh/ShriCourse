const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const User = new Schema({
    email: {type: String, unique: true},
    username: {type: String, unique: true},
    password: String
})

const Admin = new Schema({
    email: {type: String, unique: true},
    username: {type: String, unique: true},
    password: String
})

const Course = new Schema({
    title: String,
    description: String,
    price: Number,
    adminId: ObjectId
})

const Purchase = new Schema({
    userId: ObjectId,
    courseId: ObjectId
})

const userModel = mongoose.model("users", User)
const adminModel = mongoose.model("admins", Admin)
const courseModel = mongoose.model("courses", Course)
const purchaseModel = mongoose.model("purchases", Purchase)

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}