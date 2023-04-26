import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import AutenticationRoute from './src/routes/user.route.js';
import * as dotenv from 'dotenv' 
dotenv.config()

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected! Authenticationº');
  })
  .catch((err) => console.log(err));

app.use('/users', AutenticationRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
