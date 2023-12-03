const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const connectDB = require('./database/db')

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
const routeApi = require('./route/api')
connectDB()
app.use('/', routeApi)
const port = 5100
app.listen(port, (err) => {
    console.log(`App running on localhost ${port}`)
})