const User = require('../models/user')
const { Order } = require('../models/order')

exports.getUser = (req, res) => {
  req.profile.salt = undefined
  req.profile.enc_password = undefined
  return res.status(200).json(req.profile)
}

exports.updateUser = (req, res) => {
  const _id = req.profile._id
  User.findByIdAndUpdate(
    { _id },
    { $set: req.body },
    { new: true, useFindAndModify: false }
  ).exec((err, user) => {
    if (err) {
      return res.status(400).json({ error: 'Updation of user profile failed' })
    }
    user.salt = undefined
    user.enc_password = undefined
    return res.status(200).json(user)
  })
}

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate('user', '_id name')
    .exec((err, order) => {
      if (err || !order || order.length == 0) {
        return res.status(400).json({ error: 'No Orders Go Grab Somthing Now' })
      }
      return res.status(200).json(order)
    })
}

// custom middlewares
exports.getUserById = (req, res, next, id) => {
  // look for the user in the database
  User.findById({ _id: id }).exec((err, user) => {
    // if err or user is not found return 400
    if (err || !user) {
      return res.status(400).json({ error: 'User not found' })
    }
    // if user exists put the user into req.profile
    req.profile = user
    // finally move to the next
    next()
  })
}

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = []
  console.log(req.body.order)
  req.body.order.products.map((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transection_id: req.body.order.transection_id,
    })
  })
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({ error: 'Unable to update purchase list' })
      }
      next()
    }
  )
}
