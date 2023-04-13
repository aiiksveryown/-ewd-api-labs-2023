import dotenv from 'dotenv';
import express from 'express';
import db from './src/config/db';
import buildDependencies from "./src/config/dependencies";
import createGenresRouter from './src/genres/routes';
import createAccountsRouter from './src/accounts/routes';
import createMoviesRouter from './src/movies/routes';
import errorHandler from './src/utils/ErrorHandler';

dotenv.config();

const dependencies = buildDependencies();

db.init();

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use('/api/movies', createMoviesRouter(dependencies));

app.use('/api/genres', createGenresRouter(dependencies));

app.use('/api/accounts', createAccountsRouter(dependencies));

app.use(errorHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
