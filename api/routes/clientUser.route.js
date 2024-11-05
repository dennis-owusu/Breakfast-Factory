import express from 'express';
import { allClients, google, logout, updateClient } from '../controllers/clientUser.controller.js';

const router = express.Router();

router.post('/create/client-user/google', google)
router.put('/update/client-user/:id', updateClient)
router.post('/logout/client-user', logout)

router.get('/get-all/client-user', allClients)

 
export default router