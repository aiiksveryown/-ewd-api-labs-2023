import dotenv from 'dotenv';
import express from 'express';
import db from './src/config/db';
import genresRouter from './src/genres';
import createAccountsRouter from './src/accounts/routes';
import buildDependencies from "./src/config/dependencies";
import createMoviesRouter from './src/movies/routes';

dotenv.config();

const dependencies = buildDependencies();

db.init();

const app = express();

// eslint-disable-next-line no-undef
const port = process.env.PORT;

app.use(express.json());

app.use('/api/movies', createMoviesRouter(dependencies));

app.use('/api/genres', genresRouter);

app.use('/api/accounts', createAccountsRouter(dependencies));

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
