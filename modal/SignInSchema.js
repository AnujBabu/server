const mongoose = require('mongoose')
const SignUp = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    create_Time: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("SignUpSchema", SignUp)