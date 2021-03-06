const express = require('express')
const router = express.Router()

const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require('../controllers/authentication')
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user')
const { updateStock } = require('../controllers/product')
const {
  getOrderById,
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderStatus,
} = require('../controllers/order')

/** @param */
router.param('userId', getUserById)
router.param('orderId', getOrderById)

// routes

router.post(
  '/order/create/:userId',
  [isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock],
  createOrder
)

router.get(
  '/order/all/:userId',
  [isSignedIn, isAuthenticated, isAdmin],
  getAllOrders
)

router.get('/order/status/:userId', [isSignedIn, isAuthenticated])

router.put(
  '/order/:orderId/status/:userId',
  [isSignedIn, isAuthenticated, isAdmin],
  updateStatus
)

module.exports = router
