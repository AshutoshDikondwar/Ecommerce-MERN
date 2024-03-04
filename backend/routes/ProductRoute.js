import express from 'express'
import { getAllProducts, createProduct, updateProduct, getAdminProducts, deleteProduct, getSingleProduct, createProductReview, getProductReviews, deleteReview } from '../controllers/ProductController.js'
import { authirizedRole, isAuthenticatedUser } from '../middleware/auth.js'

const router = express.Router()

//create product-Admin
router.post('/admin/product/new', isAuthenticatedUser, authirizedRole("admin"), createProduct)

//get all products admin
router.get('/admin/products', isAuthenticatedUser, authirizedRole("admin"), getAdminProducts)

//get all products
router.get('/products', getAllProducts)

//update products-Admin
router.put('/admin/product/:id', isAuthenticatedUser, authirizedRole("admin"), updateProduct)

//delete-Admin
router.delete('/admin/product/:id', isAuthenticatedUser, authirizedRole("admin"), deleteProduct)

//get single product
router.get('/product/:id', getSingleProduct)
router.put('/review', isAuthenticatedUser, createProductReview)
router.get('/reviews', getProductReviews)
router.delete('/reviews', isAuthenticatedUser, deleteReview)


export default router