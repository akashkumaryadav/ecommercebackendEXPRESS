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
const paymentRoute = require('./routes/payment')

// * connecting to the database
connect()

// * GLOBALS
const APP = express()
const PORT = process.env.PORT || 8000
APP.set('view engine', 'ejs')
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
APP.use('/api', paymentRoute)
// * Routes
APP.get('/', (req, res) => {
  return res.render('pages/home', {
    documentation: {
      url: 'https://documenter.getpostman.com/view/9198714/TW6wJUEG',
    },
  })
})

// * listening on PORT
APP.listen(PORT, (res, err) =>
  console.log(`server started successfully on ${PORT}`)
)
