import express from 'express';
import AccountsController from '../controllers';
import ValidationController from '../controllers/ValidationController';

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Authentication and User data
 */

const createRouter = (dependencies) => {
  const router = express.Router();

  // load controller with dependencies
  const accountsController = AccountsController(dependencies);
  const validationController = ValidationController(dependencies);

  /**
   * @swagger
   * /security/token:
   *  post:
   *    summary: "Authenticate a user"
   *    tags: [Accounts]
   *    requestBody:
   *      required: true
   *      description: "Username and password needed to log in"
   *      content:
   *        application/json:
   *          schema:
   *            $ref: "#/definitions/loginDef"
   *    responses:
   *      '200':
   *        description: A successful response
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/definitions/tokenDef"
   *      '401':
   *        description: Unauthorized
   */
  router.route('/security/token')
    .post(validationController.validateLogin, accountsController.authenticateAccount);

  /**
   * @swagger
   * /security/verify:
   *  post:
   *    summary: "Verify a user's token"
   *    tags: [Accounts]
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: A successful response
   *      '401':
   *        description: Unauthorized
   */
  router.route('/security/verify')
    .post(accountsController.verify);

  /**
   * @swagger
   * /:
   *  post:
   *    summary: "Create a new user"
   *    tags: [Accounts]
   *    requestBody:
   *      required: true
   *      description: "User data needed to create a new user"
   *      content:
   *        application/json:
   *          schema:
   *            $ref: "#/definitions/accountDef"
   *    responses:
   *      '201':
   *        description: A successful response
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/definitions/accountDef"
   *      '400':
   *        description: Bad request
   */
  router.route('/')
    .post(validationController.validateAccount, accountsController.createAccount);

  /**
   * @swagger
   * /:
   *  get:
   *    summary: "Get all users"
   *    tags: [Accounts]
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: A successful response
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: "#/definitions/accountDef"
   */
  router.route('/')
    .get(accountsController.listAccounts);

  /**
   * @swagger
   * /{id}:
   *  get:
   *    summary: "Get user by ID"
   *    tags: [Accounts]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: Numeric ID of the user
   *    responses:
   *      '200':
   *        description: A successful response
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/definitions/accountDef"
   *      '404':
   *        description: User not found
   */
  router.route('/:id')
    .get(accountsController.getAccount);

  /**
   * @swagger
   * /search:
   *   post:
   *     summary: "Search for a user by email"
   *     tags: [Accounts]
   *     requestBody:
   *       required: true
   *       description: "Email needed to search for a user"
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/definitions/searchDef"
   *     responses:
   *       '200':
   *         description: A successful response
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/definitions/accountDef"
   *       '404':
   *         description: User not found
   */
  router.route('/search')
    .post(validationController.validateSearch, accountsController.findAccountByEmail);

  /**
   * @swagger
   * /{id}:
   *  post:
   *    summary: "Update a user"
   *    tags: [Accounts]
   *    requestBody:
   *      required: true
   *      description: "User data needed to update a user"
   *      content:
   *        application/json:
   *          schema:
   *            $ref: "#/definitions/accountDef"
   *    responses:
   *      '200':
   *        description: A successful response
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/definitions/accountDef"
   *      '400':
   *        description: Bad request
   */
  router.route('/:id')
    .put(accountsController.updateAccount);

  /**
   * @swagger
   * /{id}/favourites:
   *  post:
   *    summary: "Add a movie to a user's favourites"
   *    tags: [Accounts]
   *    requestBody:
   *      required: true
   *      description: "Movie id needed to add a movie to a user's favourites"
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *              properties:
   *                movieId:
   *                  type: integer
   *                  description: Numeric ID of the movie
   *    responses:
   *      '200':
   *        description: A successful response
   *      '400':
   *        description: Bad request
   */
  router.route('/:id/favourites')
    .post(validationController.validateMovie, accountsController.addFavourite);

  /**
   * @swagger
   * /{id}/favourites:
   *  get:
   *    summary: "Get a user's favourites"
   *    tags: [Accounts]
   *    responses:
   *      '200':
   *        description: A successful response
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                type: number
   */
  router.route('/:id/favourites')
    .get(accountsController.getFavourites);

  /**
   * @swagger
   * /{id}/favourites/{movieId}:
   *  delete:
   *    summary: "Remove a movie from a user's favourites"
   *    tags: [Accounts]
   *    responses:
   *      '200':
   *        description: A successful response
   */
  router.route('/:id/favourites/:movieId')
    .delete(accountsController.removeFavourite);

    /**
   * @swagger
   * /{id}/playlist:
   *  post:
   *    summary: "Add a movie to a user's playlist"
   *    tags: [Accounts]
   *    requestBody:
   *      required: true
   *      description: "Movie id needed to add a movie to a user's playlist"
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *              properties:
   *                movieId:
   *                  type: integer
   *                  description: Numeric ID of the movie
   *    responses:
   *      '200':
   *        description: A successful response
   *      '400':
   *        description: Bad request
   */
  router.route('/:id/playlist')
    .post(validationController.validateMovie, accountsController.addMovieToPlaylist);

  /**
   * @swagger
   * /{id}/playlist:
   *  get:
   *    summary: "Get a user's playlist"
   *    tags: [Accounts]
   *    responses:
   *      '200':
   *        description: A successful response
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                type: number
   */
  router.route('/:id/playlist')
    .get(accountsController.getUserPlaylist);

  /**
   * @swagger
   * /{id}/playlist/{movieId}:
   *  delete:
   *    summary: "Remove a movie from a user's playlist"
   *    tags: [Accounts]
   *    responses:
   *      '200':
   *        description: A successful response
   */
  router.route('/:id/playlist/:movieId')
    .delete(accountsController.removeMovieFromPlaylist);

  return router;
};
export default createRouter;