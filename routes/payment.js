const express = require('express')
const router = express.Router()
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require('../controllers/authentication')
const { getToken, processPayment } = require('../controllers/payment')
const { getUserById } = require('../controllers/user')

/** @param */
router.param('userId', getUserById)

router.get('/payment/getToken/:userId', [isSignedIn, isAuthenticated], getToken)
router.post(
  '/payment/braintree/:userId',
  [isSignedIn, isAuthenticated],
  processPayment
)

module.exports = router
