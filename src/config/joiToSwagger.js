import toSwagger from 'joi-to-swagger';

import accountSchemas from '../accounts/validators';

const accountDef = toSwagger(accountSchemas.account).swagger;
const loginDef = toSwagger(accountSchemas.login).swagger;
const movieDef = toSwagger(accountSchemas.movie).swagger;
const searchDef = toSwagger(accountSchemas.search).swagger;
const tokenDef = toSwagger(accountSchemas.token).swagger;

export default {
  accountDef,
  loginDef,
  movieDef,
  searchDef,
  tokenDef,
};
