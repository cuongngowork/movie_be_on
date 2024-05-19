import express from 'express';
import { register, login, logout } from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();

router.post('/register', register)

router.post('/login', login)

router.post('/logout', auth, logout)

export { router as userRoutes }