import express from 'express';
import { getUsers }  from '../controllers/getUsers.js';
import { userLogged }  from '../middleware/auth.js';

const userRoute = express.Router();

userRoute.get('/users', userLogged, getUsers);

export default userRoute;
