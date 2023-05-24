import express from 'express';
import MoviesController from '../controllers';
import AccountsController from '../../accounts/controllers';

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movies resource
 */

const createMoviesRouter = (dependencies) => {
  const router = express.Router();
  // load controllers with dependencies
  const moviesController = MoviesController(dependencies);
  const accountsController = AccountsController(dependencies);

  /**
   * @swagger
   * /movies/{id}:
   *   get:
   *     summary: Get a movie by ID
   *     tags: [Movies]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Movie id
   *     responses:
   *       200:
   *         description: The movie data
   *       404:
   *         description: The movie was not found
   */

  router.route('/:id')
    .get(moviesController.getMovie);

  /**
   * @swagger
   * /movies:
   *   get:
   *     summary: Returns the list of all the movies (Discovery)
   *     tags: [Movies]
   *     responses:
   *       200:
   *         description: The list of the movies
   */

  router.route('/')
    .get(moviesController.find);

  /**
   * @swagger
   * /movies/upcoming:
   *   get:
   *     summary: Get a list of upcoming movies
   *     tags: [Movies]
   *     responses:
   *       200:
   *         description: The list of upcoming movies
   */

  router.route('/upcoming')
    .get(moviesController.getUpcomingMovies);

  /**
   * @swagger
   * /movies/{id}/recommendations:
   *   get:
   *     summary: Get recommendations based on a movie ID
   *     tags: [Movies]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Movie id
   *     responses:
   *       200:
   *         description: The list of recommended movies
   */

  router.route('/:id/recommendations')
    .get(moviesController.getMovieRecommendations);

  /**
   * @swagger
   * /movies/{id}/images:
   *   get:
   *     summary: Get images of a movie
   *     tags: [Movies]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Movie id
   *     responses:
   *       200:
   *         description: The images of the movie
   */

  router.route('/:id/images')
    .get(moviesController.getMovieImages);

  /**
   * @swagger
   * /movies/{id}/reviews:
   *   get:
   *     summary: Get reviews of a movie
   *     tags: [Movies]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Movie id
   *     responses:
   *       200:
   *         description: The reviews of the movie
   */

  router.route('/:id/reviews')
    .get(moviesController.getMovieReviews);
  
  return router;
};

export default createMoviesRouter;
