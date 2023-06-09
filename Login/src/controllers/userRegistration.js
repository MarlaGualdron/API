import userModel from '../models/user.js';
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator';

export const userRegistration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, password_confirmation } = req.body;

    if (password !== password_confirmation) {
      return res.status(400).send({ message: `Passwords do not match.` });
    }
    
    const user = await userModel.findOne({ email: email}).exec();
    if (user){
        return res.status(400).send({ message: 'user email already exists'})
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
      firstName,
      lastName,
      email,
      password: passwordHash,
    };

    const userCreated = await userModel.create(newUser);

    return res.status(201).send({ message: 'User created.', data: {firstName, lastName, email} });
  } catch (err) {
    return res.status(500).send({
      message: `Something has gone wrong with the server. Please contact us if the problem persists.`,
      error: err,
    });
  }
};
