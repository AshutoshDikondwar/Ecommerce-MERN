import express from 'express'
import { registerUser, loginUser, logOutUser, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } from "../controllers/UserController.js"
import { authirizedRole, isAuthenticatedUser } from '../middleware/auth.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/password/forgot', forgotPassword)
router.put('/password/reset/:token', resetPassword)
router.get('/logout', logOutUser)
router.get('/me', isAuthenticatedUser, getUserDetails)
router.put('/password/update', isAuthenticatedUser, updateUserPassword)
router.put('/me/update', isAuthenticatedUser, updateUserProfile)
router.get('/admin/users', isAuthenticatedUser, authirizedRole("admin"), getAllUsers)
router.get('/admin/user/:id', isAuthenticatedUser, authirizedRole("admin"), getSingleUser)
router.put('/admin/user/:id', isAuthenticatedUser, authirizedRole("admin"), updateUserRole)
router.delete('/admin/user/:id', isAuthenticatedUser, authirizedRole("admin"), deleteUser)


export default router