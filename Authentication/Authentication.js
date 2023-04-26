import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import AutenticationRoute from './src/routes/user.route.js';
import * as dotenv from 'dotenv' 
dotenv.config()

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect('mongodb+srv://magualdron:prueba123@cluster0.hwiidij.mongodb.net/test')
  .then(() => {
    console.log('MongoDB connected!');
  })
  .catch((err) => console.log(err));

app.use('/users', AutenticationRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
