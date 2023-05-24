import express from 'express';
import GenresController from '../controllers';

/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: Genres Resource
 */

const createRouter = (dependencies) => {
  const router = express.Router();

  // load controller with dependencies
  const genresController = GenresController(dependencies);

  /**
   * @swagger
   * /genres:
   *   get:
   *     summary: Returns the list of all genres
   *     tags: [Genres]
   *     responses:
   *       200:
   *         description: The list of genres
   */

  router.route('/')
    .get(genresController.listGenres);
  
  /**
   * @swagger
   * /genres/{id}:
   *   get:
   *     summary: Get a genre by ID
   *     tags: [Genres]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Genre id
   *     responses:
   *       200:
   *         description: The genre data
   *       404:
   *         description: The genre was not found
   */

  router.route('/:id')
    .get(genresController.getGenre);
  
  return router;
};

export default createRouter;
