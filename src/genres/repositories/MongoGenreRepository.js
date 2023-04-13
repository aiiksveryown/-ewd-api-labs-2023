import Genre from '../entities/Genre';
import mongoose from 'mongoose';
import GenreRepository from './Repository';
import GenresData from '../data/genresData';

export default class extends GenreRepository {
  constructor() {
    super();
    const genresSchema = new mongoose.Schema({
      id: Number,
      name: String
    });
    this.model = mongoose.model('Genre', genresSchema);

    // Load genres from data file
    this.loadGenresFromData();
  }

  async loadGenresFromData() {
    try {
      const existingGenres = await this.model.find();
      if (existingGenres.length === 0) {
        console.log('Loading genres from data file...');
        const insertedGenres = await this.model.insertMany(GenresData.genres);
        console.log('Loaded', insertedGenres.length, 'genres');
      }
    } catch (error) {
      console.error('Error loading genres from data file:', error);
    }
  }  

  async get(genreId) {
    const result = await this.model.findOne({ id: genreId });
    if (result) {
      return new Genre(result.id, result.name);
    }
    return null;
  }

  async find() {
    const genres = await this.model.find();
    return genres.map((result) => {
      return new Genre(result.id, result.name);
    });
  }
}

