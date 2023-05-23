/* eslint-disable no-unused-vars */
import accountService from "../services";

export default (dependencies) => {
  
  const createAccount = async (request, response, next) => {
    const { firstName, lastName, email, password } = request.body;
    const account = await accountService.registerAccount(firstName, lastName, email, password, dependencies);
    response.status(201).json(account);
  };
  const findAccountByEmail = async (request, response, next) => {
    const { email } = request.body;
    const account = await accountService.findByEmail(email, dependencies);
    response.status(200).json(account);
  };
  const getAccount = async (request, response, next) => {
    const accountId = request.params.id;
    const account = await accountService.getAccount(accountId, dependencies);
    response.status(200).json(account);
  };
  const listAccounts = async (request, response, next) => {
    const accounts = await accountService.find(dependencies);
    response.status(200).json(accounts);
  };
  const updateAccount = async (request, response, next) => {
    const accountId = request.params.id;
    const { firstName, lastName, email, password } = request.body;
    const account = await accountService.updateAccount(accountId, firstName, lastName, email, password, dependencies);
    response.status(200).json(account);
  };
  const authenticateAccount = async (request, response, next) => {
    try {
      const { email, password } = request.body;
      const {token, id} = await accountService.authenticate(email, password, dependencies);
      response.status(200).json({ token: `BEARER ${token}`, id });
    } catch (error) {
      response.status(401).json({ message: 'Unauthorised' });
    }
  };
  const addFavourite = async (request, response, next) => {
    try {
      const movieId = request.body.movieId;
      const id = request.params.id;
      const account = await accountService.addFavourite(id, movieId, dependencies);
      response.status(200).json(account);
    } catch (err) {
      next(new Error(`Invalid Data ${err.message}`));
    }
  };
  const getFavourites = async (request, response, next) => {
    try {
      const id = request.params.id;
      const favourites = await accountService.getFavourites(id, dependencies);
      response.status(200).json(favourites);
    } catch (err) {
      next(new Error(`Invalid Data ${err.message}`));
    }
  };
  const removeFavourite = async (request, response, next) => {
    try {
      const movieId = Number(request.params.movieId)
      const id = request.params.id;
      const account = await accountService.removeFavourite(id, movieId, dependencies);
      response.status(200).json(account);
    } catch (err) {
      if (err.message === `Movie with ID ${movieId} is not in favourites`) {
        response.status(404).json({ message: err.message });
      }
      else next(new Error(`Invalid Data ${err.message}`));
    }
  };
  const getUserPlaylist = async (request, response, next) => {
    try {
      const id = request.params.id;
      const playlist = await accountService.getUserPlaylist(id, dependencies);
      response.status(200).json(playlist);
    } catch (err) {
      next(new Error(`Invalid Data ${err.message}`));
    }
  };
  const addMovieToPlaylist = async (request, response, next) => {
    try {
      const movieId = request.body.movieId;
      const id = request.params.id;
      const account = await accountService.addMovieToPlaylist(id, movieId, dependencies);
      console.log("addMovieToPlaylist", request.body.movieId, account)
      response.status(200).json(account);
    } catch (err) {
      next(new Error(`Invalid Data ${err.message}`));
    }
  };
  const removeMovieFromPlaylist = async (request, response, next) => {
    try {
      const movieId = Number(request.params.movieId)
      const id = request.params.id;
      const account = await accountService.removeMovieFromPlaylist(id, movieId, dependencies);
      response.status(200).json(account);
    } catch (err) {
      if (err.message === `Movie with ID ${movieId} is not in playlist`) {
        response.status(404).json({ message: err.message });
      }
      else next(new Error(`Invalid Data ${err.message}`));
    }
  };
  const verify = async (request, response, next) => {
    try { 
    const authHeader = request.headers.authorization;
    const accessToken = authHeader.split(" ")[1];
    const user = await accountService.verifyToken(accessToken, dependencies);

    next();
  } catch(err) {
      next(new Error(`Verification Failed ${err.message}`));
      }
  };

  return {
    createAccount,
    getAccount,
    findAccountByEmail,
    listAccounts,
    updateAccount,
    authenticateAccount,
    addFavourite,
    getFavourites,
    removeFavourite,
    getUserPlaylist,
    addMovieToPlaylist,
    removeMovieFromPlaylist,
    verify
  };
};
