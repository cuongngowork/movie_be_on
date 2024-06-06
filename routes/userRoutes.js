import express from 'express';
import { register, login, logout } from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();

/**
 * @swagger
 * /register:
 *     post:
 *       summary: Register route
 *       description: Return  a user profile
 *       responses:
 *         200:
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 */
router.post('/register', register)


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login route
 *     description: Return  a user profile
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.post('/login', login)


/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout route
 *     description: Return  a user profile
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.post('/logout', auth, logout)

export { router as userRoutes }