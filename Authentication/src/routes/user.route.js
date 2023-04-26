import express from 'express';
import { body } from 'express-validator';
import { userRegistration } from '../controllers/userRegistration.js';

const authenticationRoute = express.Router();

authenticationRoute.post(
  '/register',
  [
    body('firstName').trim().not().isEmpty().withMessage('First name is required.'),
    body('lastName').trim().not().isEmpty().withMessage('Last name is required.'),
    body('email').trim().isEmail().withMessage('Invalid email address.'),
    body('password_confirmation')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long.'),
  ],
  userRegistration
);

export default authenticationRoute;
