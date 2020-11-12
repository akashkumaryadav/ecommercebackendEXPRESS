const Category = require('../models/category')
const category = require('../models/category')

/** createCategory controller */
exports.createCategory = (req, res) => {
  const category = new Category(req.body)
  category.save((err, category) => {
    if (err || !category) {
      return res.status(401).json({ error: 'unable to create the category' })
    }
    return res.status(200).json(category)
  })
}

/** getCategories controller */
exports.getCategories = (req, res) => {
  Category.find({}).exec((err, categories) => {
    if (err || !categories || categories.length == 0) {
      return res.status(400).json({ error: 'No categories found' })
    }
    return res.status(200).json(categories)
  })
}

/** getCategory controller */
exports.getCategory = (req, res) => {
  return res.status(200).json(req.category)
}

/** updateCategory controller */
exports.updateCategory = (req, res) => {
  const category = req.category
  category.name = req.body.name
  category.save((err, category) => {
    if (err || !category) {
      return res.status(401).json({ error: 'Updation failed of the category' })
    }
    return res.status(200).json(category)
  })
}

/** deleteCategory controller */
exports.deleteCategory = (req, res) => {
  const category = req.category
  category.remove((err, category) => {
    if (err || !category) {
      return res.status(401).json({ error: 'Failed to remove this category' })
    }
    return res
      .status(200)
      .json({ message: ` successfully deleted category  ${category.name}` })
  })
}

// customMiddleware
exports.getCategoryById = (req, res, next, id) => {
  Category.findById({ _id: id }, (err, category) => {
    if (err || !category) {
      return res.status(400).json({ error: 'category not found' })
    }
    req.category = category
    next()
  })
}
