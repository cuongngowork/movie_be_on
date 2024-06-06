import express from 'express';
import { getMovies, getMovieById, createNewMovie, updateMovie, deleteMovie } from '../controllers/movieController.js';
import { auth, authAdmin } from '../middlewares/auth.js';
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get movies route
 *     description: Return movies
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.get('/', auth, getMovies)


/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get movie detail route
 *     description: Return movies
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.get('/:id', auth, getMovieById)

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create new movie route
 *     description: Return movies
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.post('/', auth, authAdmin, createNewMovie)


/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update movies route
 *     description: Return movies
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.put('/:id', auth, authAdmin, updateMovie)

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Update movies route
 *     description: Return movies
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.delete('/:id', auth, authAdmin, deleteMovie)

export { router as movieRoutes }
