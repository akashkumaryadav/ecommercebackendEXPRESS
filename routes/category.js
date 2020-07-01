const express = require('express')
const router = express.Router()

const {
  getCategoryById,
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require('../controllers/category')

const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require('../controllers/authentication')
const { getUserById } = require('../controllers/user')

router.param('userId', getUserById)
router.param('categoryId', getCategoryById)

/** createCategory
 * @method POST
 * @param userId
 */
router.post(
  '/category/create/:userId',
  [isSignedIn, isAuthenticated, isAdmin],
  createCategory
)

/** updateCategory
 * @method PUT
 * @param categoryId,userId
 */
router.put(
  '/category/:categoryId/:userId',
  [isSignedIn, isAuthenticated, isAdmin],
  updateCategory
)

/** deleteCategory
 * @method DELETE
 * @param categoryId,userId
 */
router.delete(
  '/category/:categoryId/:userId',
  [isSignedIn, isAuthenticated, isAdmin],
  deleteCategory
)

/** getCategory
 * @method GET
 * @param categoryId
 */
router.get('/category/:categoryId', getCategory)

/** getCategories
 * @method GET
 * @param null
 */
router.get('/categories', getCategories)

module.exports = router
