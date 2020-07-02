const express = require('express')
const router = express.Router()

const {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  photo,
} = require('../controllers/product')

const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require('../controllers/authentication')

const { getUserById } = require('../controllers/user')

/** @param */
router.param('userId', getUserById)
router.param('productId', getProductById)

/** createProduct
 * @param userID
 * @method POST
 */
router.post(
  '/product/create/:userId',
  [isSignedIn, isAuthenticated, isAdmin],
  createProduct
)

/** updateProduct
 * @param userId,productId
 * @method PUT
 */
router.put(
  '/product/:productId/:userId',
  [isSignedIn, isAuthenticated, isAdmin],
  updateProduct
)

/** deleteProduct
 * @param userId,productId
 * @method DELETE
 */
router.delete(
  '/product/:productId/:userId',
  [isSignedIn, isAuthenticated, isAdmin],
  deleteProduct
)
/** getProduct
 * @param productId
 * @method GET
 */
router.get('/product/:productId', getProduct)

/** getAllProduct
 * @param null
 * @method GET
 */
router.get('/products', getAllProduct)

/** getPhot
 *
 * @param productId
 * @method GET
 */
router.get('/product/photo/:productId', photo)

module.exports = router
