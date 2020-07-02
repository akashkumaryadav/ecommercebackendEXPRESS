require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connect = require('./utils/connectDb')

// * Router routes
const authenticationRoutes = require('./routes/authentication')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')

// * connecting to the database
connect()

// * GLOBALS
const APP = express()
const PORT = process.env.PORT || 8000

// * middlewares for all requests
APP.use(cookieParser())
APP.use(cors())
APP.use(express.json())

// * Router Routes
APP.use('/api', authenticationRoutes)
APP.use('/api', userRoutes)
APP.use('/api', categoryRoutes)
APP.use('/api', productRoutes)
APP.use('/api', orderRoutes)
// * Routes
APP.get('/', (req, res) => {
  return res.json({
    message: 'server is running successfully and this is a test route',
  })
})

// * listening on PORT
APP.listen(PORT, (res, err) =>
  console.log(`server started successfully on ${PORT}`)
)
