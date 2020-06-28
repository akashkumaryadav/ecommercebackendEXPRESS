const express = require('express')
const router = express.Router()
const { signout } = require('../controllers/authentication')

// SIGNOUT ROUTE
// method : GET
router.get('/signout', signout)
module.exports = router
