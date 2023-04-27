import express from 'express';
import { body } from 'express-validator';
import { userRegistration } from '../controllers/userRegistration.js';
import { userLogIn } from '../controllers/userLogIn.js';
import { userLogged } from '../middleware/auth.js';
import axios from 'axios';
import qs from 'qs';

const loginRoute = express.Router();

loginRoute.post(
  '/register',
  [
    body('firstName').trim().not().isEmpty().withMessage('First name is required.'),
    body('lastName').trim().not().isEmpty().withMessage('Last name is required.'),
    body('email').trim().isEmail().withMessage('Invalid email address.'),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long.'),
  ],
  userRegistration
);

loginRoute.post('/login',
  [
    body('email').trim().isEmail().withMessage('Invalid email address.'),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long.'),
  ],
  userLogIn
);

loginRoute.get('/list', userLogged, async(req, res) => {
  const options = {
    baseURL: process.env.BUSINESS_URL,
    timeout: 5000,
    url: (req.query)? '/business/users?' + qs.stringify(req.query) : '/business/users',
    method: 'get',
    headers: {'Authorization': req.get('authorization')},
  };
  
  axios(options)
  .then(response => {
    console.log(response.data);
    res.status(200).send(response.data)
  })
  .catch(err => {
    res.status(500).send({ message: 'Error fetching internal business API.', err})
  })
})

export default loginRoute;
