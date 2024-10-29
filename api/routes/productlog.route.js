import express from 'express';
import { createProductLog } from '../controllers/productlog.controller.js';

const router = express.Router()

router.post('/create-productlog', createProductLog)

export default router