const { Order, ProductCart } = require('../models/order')

/** createProduct
 * @param userId
 * @method POST
 */
exports.createOrder = (req, res) => {
  req.body.order.user = req.profile
  const order = new Order(req.body.order)
  console.log(order)
  order.save((err, product) => {
    if (err) {
      return res.status(400).json({ error: 'Failed to create your order' })
    }
    return res.status(200).json(order)
  })
}

/** getAllOrders
 * @param userId
 * @method GET
 */
exports.getAllOrders = (req, res) => {
  Order.find({})
    .populate('user', 'name')
    .exec((err, orders) => {
      if (err) {
        return res
          .status(400)
          .json({ error: 'No orders found go get something for you' })
      }
      return res.status(200).json(orders)
    })
}

/** getOrderStatus
 * @method GET
 */
exports.getOrderStatus = (req, res) => {
  return res.json(Order.schema.path('status').enumValues)
}

/** updateStatus
 * @param orderId,userID
 * @method PUT
 */
exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        res.status(400).json({ error: 'Failed to update order status' })
      }

      res.status(200).json(order)
    }
  )
}

/** @description custom Middleware  */
/** getOrderById */
exports.getOrderById = (req, res, next, id) => {
  Order.findById({ _id: id })
    .populate('products.product', 'name price')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({ error: 'No orders found' })
      }
      req.order = order
      next()
    })
}
