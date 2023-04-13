//* validators/register.validator.js
import Joi from 'joi';

const accountSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{7,20}$/)
    .required()
    .error(
      new Error(
        'Password must be between 7 and 20 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@#$%^&-+=())'
      )
    ),
  firstName: Joi.string().min(1).max(30).required(),
  lastName: Joi.string().min(1).max(30).required(),
});

export default {account: accountSchema};
