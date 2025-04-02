import express from 'express'
import { deleteOutlet, getAllOutlets, google, apple, logout, outletSignin, outletSignup } from '../controllers/outlet.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/outlet-signup', outletSignup)
router.post('/outlet-logout', logout)
router.post('/outlet-google', google)
router.post('/outlet-apple', apple)
router.post('/outlet-signin', outletSignin)
router.get('/all-outlets', getAllOutlets)
router.delete('/delete-outlet/:outletId', verifyToken, deleteOutlet)

export default router