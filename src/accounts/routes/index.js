import express from 'express';
import AccountsController from '../controllers';
import ValidationController from '../controllers/ValidationController';

const createRouter = (dependencies) => {
  const router = express.Router();

  // load controller with dependencies
  const accountsController = AccountsController(dependencies);
  const validationController = ValidationController(dependencies);

  router.route('/')
    .post(validationController.validateAccount, accountsController.createAccount);
  
  router.route('/')
    .get(accountsController.listAccounts);
  
  router.route('/:id')
    .get(accountsController.getAccount);
  
  router.route('/:id')
    .put(accountsController.updateAccount);
  
  return router;
};
export default createRouter;
