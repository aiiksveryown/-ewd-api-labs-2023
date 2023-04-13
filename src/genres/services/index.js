export default {
  getGenre: (genreId, {genresRepository}) => {
    return genresRepository.get(genreId);
  },
  find: ({genresRepository})=>{
    return genresRepository.find();
  },
};
