const express = require('express')
const router = express.Router()

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require('../controllers/user')

const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require('../controllers/authentication')

// popultate the getUserById middleware with params
router.param('userId', getUserById)

/** getUser route
 * @param userID
 * @method GET*/
router.get('/user/:userId', [isSignedIn, isAuthenticated], getUser)

/** updateUser route
 * @param userID
 * @method put*/
router.put('/user/:userId', [isSignedIn, isAuthenticated], updateUser)

/** getUserPurschaseList route
 * @param userID
 * @method GET*/
router.get(
  '/orders/user/:userId',
  [isSignedIn, isAuthenticated],
  userPurchaseList
)

/** TEST ROute */
router.get('/testroute', (req, res) => {
  return res.status(200).json({ message: 'this is an user test route' })
})

module.exports = router
