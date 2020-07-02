const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: 'Product',
  },
  name: String,
  count: Number,
  price: Number,
})

const ProductCart = mongoose.model('productCart', productCartSchema)

const orderSchema = new mongoose.Schema(
  {
    products: [productCartSchema],
    transection_id: {},
    amount: { type: Number },
    address: { type: String },
    updated: Date,
    status: {
      type: String,
      default: 'Recieved',
      enum: ['Recieved', 'Cancelled', 'Processing', 'Shipped', 'Delivered'],
    },
    user: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const Order = mongoose.model('order', orderSchema)

module.exports = {
  Order,
  ProductCart,
}
