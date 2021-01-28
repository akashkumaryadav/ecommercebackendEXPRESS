const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const User = require('../models/user')

/** utitlity function to pull errors from the validation Result
 * @param Result.errors
 * */

const { pullArrayOfErrors } = require('../utils/pullerror.js')

// SIGNOUT route
// @method : GET

exports.signout = (req, res) => {
  res.clearCookie('auth-token')
  return res.status(200).json({ message: 'user signout successfully' })
}

// SIGNUP route
// @method : POST

exports.signup = (req, res) => {
  // pulling out the validation Result
  const Result = validationResult(req)

  // checking for validation errors
  if (!Result.isEmpty()) {
    // ruturning all the validation error msg's
    return res.status(422).json({ errors: pullArrayOfErrors(Result.errors) })
  }

  // creting the user from the req body
  const user = new User(req.body)
  // saving the user in database
  user.save((errors, user) => {
    if (errors) {
      // if somthing happens logging the database error
      console.log(errors)
      // notifying the user that somthing went wrong while creating the user
      return res.status(400).json({
        errors: [
          'Unable to create user make sure correct data is provided or May be user already exist',
        ],
      })
    }
    // if everything goes fine returning the created user
    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    })
  })
}

//SIGNIN route
// @method : POST
exports.signin = (req, res) => {
  // pulling out the validation result
  const Result = validationResult(req)
  // pulling information from the request body to login
  const { email, password } = req.body

  //checking for the errors
  if (!Result.isEmpty()) {
    // returning array of the validation errors occured
    return res.status(401).json({ errors: pullArrayOfErrors(Result.errors) })
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ errors: ['user does not exist'] })
    }
    // checking for authenticity of the user
    if (!user.authenticate(password)) {
      return res
        .status(401)
        .json({ errors: ['Email or password does not match'] })
    }

    // generating auth_token for the user
    const auth_token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: 3000,
    })
    res.cookie('auth-token', auth_token, { expire: new Date() + 9999 })
    return res.status(200).json({
      auth_token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  })
}

// protected routes controllers

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: 'auth',
})

// custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id
  if (!checker) {
    return res.status(403).json({ error: 'ACCESS DENIED' })
  }
  next()
}

exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res
      .status(403)
      .json({ error: 'ACCESS DENIED only admin can access' })
  }
  next()
}
