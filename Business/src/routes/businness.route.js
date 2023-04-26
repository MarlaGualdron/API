import express from 'express';
import { getUsers }  from '../controllers/getUsers.js';

const userRoute = express.Router();

userRoute.get('/users', getUsers);


export default userRoute;
