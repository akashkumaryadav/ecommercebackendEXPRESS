const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 32,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 2000,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 42,
    },
    category: {
      type: ObjectId,
      required: true,
      ref: 'Category',
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
)

const Product = mongoose.model('product', productSchema)

module.exports = Product
