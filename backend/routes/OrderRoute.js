import express from 'express'
import { neworder, getSingleOrder, myOrders, getAllorders, updateOrderStatus, deleteOrder } from '../controllers/OrderController.js'
import { authirizedRole, isAuthenticatedUser } from '../middleware/auth.js'


const router = express.Router()
router.post('/order/new', isAuthenticatedUser, neworder)
router.get('/order/:id', isAuthenticatedUser, getSingleOrder)
router.get('/orders/me', isAuthenticatedUser, myOrders)
router.get('/admin/orders', isAuthenticatedUser, authirizedRole("admin"), getAllorders)
router.put('/admin/order/:id', isAuthenticatedUser, authirizedRole("admin"), updateOrderStatus)
router.delete('/admin/order/:id', isAuthenticatedUser, authirizedRole("admin"), deleteOrder)


export default router