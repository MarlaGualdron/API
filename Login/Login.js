import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import LoginRoute from './src/routes/user.route.js';
import * as dotenv from 'dotenv';
dotenv.config({path: '../.env'});

const app = express();
const PORT = process.env.LOGIN_PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Login - MongoDB connected!');
  })
  .catch((err) => console.log(err));

app.use('/users', LoginRoute);

app.listen(PORT, () => {
  console.log(`Login - Server is listening on port ${PORT}`);
});
