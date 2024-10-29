import express from 'express'
import { cashPayment, getAdminAllCashPayment, getAllCashPayment } from '../controllers/cash.controller.js'

const router = express.Router()

router.post('/cash-payment', cashPayment)
router.get('/all-cash-payment', getAllCashPayment)
router.get('/admin-get-cash-payment', getAdminAllCashPayment)


export default router