import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv' 
dotenv.config()
const accessToken = process.env.ACCESS_TOKEN;

export const emailValidator = (email) => {
  const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/gm;
  if (!emailRegex.test(email)) { return false; } else { return true; };
};

export const tokenCreated = (firstName, email) => {
  const payload = {
    sub:  firstName,
    name: email,
    rol: "user"
  };
  return jwt.sign(payload, accessToken);
};

