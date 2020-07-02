const Product = require('../models/product')
const formidable = require('formidable')
const fs = require('fs')

/** createProduct
 * @method POST
 */
exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ error: 'Unable to upload photo' })
    }
    let product = new Product(fields)
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: 'File size is too big' })
      }
      product.photo.data = fs.readFileSync(file.photo.path)
      product.photo.contentType = file.photo.type
    }
    product.save((err, product) => {
      console.log(err)
      if (err) {
        res.status(400).json({ error: 'Saving tshirt in DB failed' })
      }
      return res.status(200).json(product)
    })
  })
}

/** update Product
 * @method PUT
 */
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ error: 'Fail to update (0.1)' })
    }
    let product = req.product
    Object.assign(product, fields)

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: 'File size is too big' })
      }
      product.photo.data = fs.readFileSync(file.photo.path)
      product.photo.contentType = file.photo.type
    }
    product.save((err, product) => {
      if (err || !product) {
        return res.status(400).json({ error: 'Updation Failed' })
      }
      return res.status(200).json(product)
    })
  })
}

/** getProduct
 * @method GET
 */
exports.getProduct = (req, res) => {
  req.product.photo = undefined
  return res.status(200).json(req.product)
}

/** getAllProduct
 * @method GET
 */
exports.getAllProduct = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id'

  Product.find({})
    .select('-photo')
    .limit(limit)
    .sort([[sortBy, 'asc']])
    .exec((err, products) => {
      if (err || products.length == 0) {
        return res.status(400).json({ error: 'No Products 😞' })
      }
      return res.status(200).json(products)
    })
}

/** deleteProduct
 * @method delete
 */
exports.deleteProduct = (req, res) => {
  req.product.remove((err, product) => {
    if (err) {
      return res.status(400).json({ error: 'Fail to remove product' })
    }
    return res
      .status(200)
      .json({ message: `Successfully delete ${req.product.name}` })
  })
}

/** Middle ware for performance optimization */
exports.photo = (req, res) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType)
    return res.status(200).send(req.product.photo.data)
  }
}

/** getProductById */
exports.getProductById = (req, res, next, id) => {
  Product.findById({ _id: id })
    .populate('category', 'name')
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({ error: 'Product Not Found' })
      }
      req.product = product
      next()
    })
}

exports.updateStock = (req, res, next) => {
  let updateStockOperation = req.body.order.products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { stock: -product.count, sold: +product.count } },
      },
    }
  })

  Product.bulkWrite(updateStockOperation, (err, products) => {
    if (err) {
      return res.status(400).json({ error: 'Bulk Operation Failed' })
    }
  })
  next()
}
