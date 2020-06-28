const mongoose = require('mongoose')
const { ObjectID } = mongoose.Schema

const productCartSchema = new mongoose.Schema({
  product: {
    type: ObjectID,
    ref: 'Product',
  },
  name: String,
  count: Number,
  price: Number,
})

const ProductCart = mongoose.model('ProductCart', ProductCartSchema)

const orderSchema = new mongoose.Schema(
  {
    products: [productCartSchema],
    transection_id: {},
    amount: { type: Number },
    address: { type: String },
    updated: Date,
    user: {
      type: ObjectID,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const Order = module.exports('Order', orderSchema)

module.exports = {
  Order,
  ProductCart,
}
