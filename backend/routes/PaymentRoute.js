import express from 'express'
import { processPayment, sendStripeSpiKey } from '../controllers/PaymentControllers.js'
import { isAuthenticatedUser } from '../middleware/auth.js'
const router = express.Router()

router.post("/payment/process", isAuthenticatedUser, processPayment)
router.get("/stripeapikey", isAuthenticatedUser, sendStripeSpiKey)

export default router
