import dotenv from 'dotenv';
import express from 'express';
import db from './src/config/db';
import buildDependencies from "./src/config/dependencies";
import createGenresRouter from './src/genres/routes';
import createAccountsRouter from './src/accounts/routes';
import createMoviesRouter from './src/movies/routes';
import errorHandler from './src/utils/ErrorHandler';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import definitions from './src/config/joiToSwagger';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: 'Movies API',
      description: 'Movies API Information',
      contact: {
        name: 'Ikechukwu Festus-Ihedioha'
      },
      servers: ['http://localhost:8080'],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
      schemas: {
        accountDef: definitions.accountDef,
        loginDef: definitions.loginDef,
        movieDef: definitions.movieDef,
        searchDef: definitions.searchDef,
        tokenDef: definitions.tokenDef,
      },
    },
    definitions: {
      accountDef: definitions.accountDef,
      loginDef: definitions.loginDef,
      movieDef: definitions.movieDef,
      searchDef: definitions.searchDef,
      tokenDef: definitions.tokenDef,
    },
  },
  apis: ['src/**/routes/index.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

dotenv.config();

const dependencies = buildDependencies();

db.init();

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/movies', createMoviesRouter(dependencies));

app.use('/api/genres', createGenresRouter(dependencies));

app.use('/api/accounts', createAccountsRouter(dependencies));

app.use(errorHandler);

switch (process.env.NODE_ENV) {
  case 'localhost':
    app.listen(port, () => {
      console.info(`Server running at ${port}`);
    });
    break;
}

export default app;