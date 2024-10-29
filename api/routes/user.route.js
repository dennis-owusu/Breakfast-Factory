import express from 'express'
import { deleteUser, getUsers, google, signin, signup, logout, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'


const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.put('/update/:userId', verifyToken, updateUser);
router.post('/google', google)
router.post('/logout', logout)
router.get('/allusers', getUsers)
router.delete('/delete/:userId', verifyToken, deleteUser);


export default router  