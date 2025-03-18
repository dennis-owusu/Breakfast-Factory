import express from 'express'
import {addAddress} from '../controllers/address.controller.js'

const router = express.Router()

router.post('/add', addAddress)


export default router 