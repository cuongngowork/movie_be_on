import express from 'express';
import { register, login, logout } from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operations related to users
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          role:
 *            type: string
 *          accessToken:
 *            type: string
 *      UserBodyRequest:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 */

/**
 * @swagger
 * /auth/register:
 *     post:
 *       summary: Register
 *       description: This API is used to register a new account
 *       tags: [User]
 *       requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/UserBodyRequest'
 *       responses:
 *         200:
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/User'
 */
router.post('/register', register)


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     description: This API is used to login account
 *     tags: [User]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/UserBodyRequest' 
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/User'
 */
router.post('/login', login)


/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout
 *     description: This API is used to logout account
 *     tags: [User]
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