require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// * Router routes
const authenticationRoute = require('./routes/authentication')
const userRoute = require('./routes/user')

// * connecting to the database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('database connected')
  })
  .catch((err) => {
    console.error(err)
  })

// * GLOBALS
const APP = express()
const PORT = process.env.PORT || 8000

// * middlewares for all requests
APP.use(cookieParser())
APP.use(cors())
APP.use(express.json())

// * Routes
APP.get('/', (req, res) => {
  return res.json({
    message: 'server is running successfully and this is a test route',
  })
})

// * Router Routes
APP.use('/api', authenticationRoute)
APP.use('/api', userRoute)

// * listening on PORT
APP.listen(PORT, (res, err) =>
  console.log(`server started successfully on ${PORT}`)
)
