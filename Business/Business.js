import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './src/routes/businness.route.js';
import * as dotenv from 'dotenv' 
dotenv.config({path: '../.env'})

console.log("Business env:", process.env.BUSINESS_PORT, process.env.MONGO_URI)
const app = express();
const PORT = process.env.BUSINESS_PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Business - Connected to MongoDB database`);
  })
  .catch((err) => console.error(err));

app.use('/business', userRoute);

app.listen(PORT, () => {
  console.log(`Business - Server is listening on port ${PORT}`);
});
