import express from 'express';
/* import { paymentWebhook, verifyPayment } from '../controllers/paystack.controller.js'; */
import { adminTransactionData, getTransaction, transaction } from '../controllers/transaction.controller.js';


const router = express.Router()
/* router.post('/transaction-webhook', paymentWebhook) */
router.post('/transaction', transaction)
router.get('/all-transaction', getTransaction)
router.get('/admin-transaction', adminTransactionData)

export default router 