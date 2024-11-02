import express from 'express';
import { allClients, createClient, loginClient } from '../controllers/clientUser.controller.js';

const router = express.Router();

router.post('/create/client-user', createClient)
router.post('/login/client-user', loginClient)
router.get('/create/client-user', allClients)


export default router