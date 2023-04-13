/* eslint-disable no-unused-vars */
import genreService from "../services";

export default (dependencies) => {

  const getGenre = async (request, response, next) => {
    try {
      const genreId = Number(request.params.id);
      const genre = await genreService.getGenre(genreId, dependencies);
      response.status(200).json(genre);
    } catch (error) {
      console.log(error);
      next(new Error(`Error ${error.message}`));
    }
  };
  const listGenres = async (request, response, next) => {
    try {
      const genre = await genreService.find(dependencies);
      response.status(200).json(genre);
    } catch (error) {
      next(new Error(`Error ${error.message}`));
    }
  };

  return {
    getGenre,
    listGenres,
  };
};
