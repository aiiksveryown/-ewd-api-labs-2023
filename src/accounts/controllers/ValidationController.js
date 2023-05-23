export default (dependencies) => {
  
  const { accountSchema } = dependencies;
  
  const validateAccount = async (request, response, next) => {
    console.log('validateAccount', request.body);
    // Input
    try {
      const validated = await accountSchema['account'].validateAsync(request.body);
      request.body = validated;
      next();
    } catch (err) {
      console.log('err', err);
      next(new Error(`Invalid Data ${err.message}`));
    }
  };

  const validateLogin = async (request, response, next) => {
    // Input
    try {
      const validated = await accountSchema['login'].validateAsync(request.body);
      request.body = validated;
      next();
    } catch (err) {
      console.log('err', err);
      next(new Error(`Invalid Data ${err.message}`));
    }
  };

  const validateMovie = async (request, response, next) => {
    console.log('validateMovie', request.body);
    // Input
    try {
      const validated = await accountSchema['movie'].validateAsync(request.body);
      request.body = validated;
      next();
    } catch (err) {
      console.log('err', err);
      next(new Error(`Invalid Data ${err.message}`));
    }
  };

  const validateSearch = async (request, response, next) => {
    console.log('validateSearch', request.body);
    // Input
    try {
      const validated = await accountSchema['search'].validateAsync(request.body);
      request.body = validated;
      next();
    } catch (err) {
      console.log('err', err);
      next(new Error(`Invalid Data ${err.message}`));
    }
  };
  
  return {
    validateAccount,
    validateLogin,
    validateMovie,
    validateSearch,
  };
};
