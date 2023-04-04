import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './src/movies';

dotenv.config();

const app = express();

// eslint-disable-next-line no-undef
const port = process.env.PORT;

app.use('/api/movies', moviesRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
