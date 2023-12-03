const mongoose = require('mongoose')
const TableData = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    designation: {
        type: String,
        required: true
    },
    create_Time: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("TableSchema", TableData)