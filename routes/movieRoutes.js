import express from 'express';
import { getMovies, getMovieById, createNewMovie, updateMovie, deleteMovie } from '../controllers/movieController.js';
import { auth, authAdmin } from '../middlewares/auth.js';
const router = express.Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      Movie:
 *        type: object
 *        properties:
 *          _id: 
 *            type: string
 *          title: 
 *            type: string
 *          year: 
 *            type: string
 *          poster: 
 *            type: string
 *          __v: 
 *            type: number
 *      MovieBodyRequest:
 *        type: object
 *        properties:
 *          title: 
 *            type: string
 *          year: 
 *            type: string
 *          poster: 
 *            type: string
 */


/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get movies
 *     description: This API is used to get movies
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#components/schemas/Movie'
 */
router.get('/', auth, getMovies)


/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get movie detail
 *     description: This API is used to get movie detail
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: String ID required
 *          schema: 
 *            type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#components/schemas/Movie'
 */
router.get('/:id', auth, getMovieById)


/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     description: This API is used to create a new movie
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/MovieBodyRequest'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Movie'
 */
router.post('/', auth, authAdmin, createNewMovie)



/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie
 *     description: This API is used to update a movie
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: String ID required
 *          schema: 
 *            type: string
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/MovieBodyRequest' 
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Movie'
 */
router.put('/:id', auth, authAdmin, updateMovie)



/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     description: This API is used to delete a movie
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: String ID required
 *          schema: 
 *            type: string 
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
