import express from 'express';
import { allClients, google, updateClient } from '../controllers/clientUser.controller.js';

const router = express.Router();

router.post('/create/client-user/google', google)
router.put('/update/client-user/:id', updateClient)

router.get('/get-all/client-user', allClients)

 
export default router