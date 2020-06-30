const express = require('express')
const { check } = require('express-validator')
const {
  signout,
  signup,
  signin,
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require('../controllers/authentication')
const router = express.Router()

// method : GET
router.get('/signout', signout)

// SIGNOUT ROUTE
router.post(
  '/signup',
  [
    check('name', 'name should be atleast 3 characters long').isLength({
      min: 3,
    }),
    check('email', 'not a valid email please provide valid email').isEmail(),
    check(
      'password',
      'password should be atleast 3 charachters long'
    ).isLength({ min: 3 }),
  ],
  signup
)

// SIGNIN route
router.post(
  '/signin',
  [
    check('email', 'not a valid email please provide valid email').isEmail(),
    check('password', 'password should be atleast 3 charachters long').isLength(
      {
        min: 3,
      }
    ),
  ],
  signin
)

// testing protected controllers
router.get('/testroute', [isSignedIn], (req, res) => {
  res.send('protected route')
})

module.exports = router
