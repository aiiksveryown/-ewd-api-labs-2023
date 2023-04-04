import express from 'express';
import { genres } from './genreData';

const router = express.Router(); 

router.get('/', (req, res) => {
    res.json(genres);
});

// Get genre details
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  // find genre in list
  let genre = genres.genres.find((genre) => genre.id == id);

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(404).json({
      message: 'The resource you requested could not be found.',
      status_code: 404
    });
  }    
});

export default router;
