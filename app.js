const express = require('express')
const mongoose = require('mongoose')

// * connecting to the database
mongoose.connect('mongodb://localhost:27017/eoutlet', { useNewUrlParser: true })

// * GLOBALS
const APP = express()
const PORT = 5000

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
