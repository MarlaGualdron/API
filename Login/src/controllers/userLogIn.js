import userModel from '../models/user.js';
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator';
import { tokenCreated } from '../utils/utils.js';

export const userLogIn = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array().map((x) => x.msg)  });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email}).exec();

    if (!user) {
        return res.status(404).send({message: "user not found."})
    }

    const match = await bcrypt.compare(password, user.password);
    if (match === false) {
      return res.status(400).send({message: 'Wrong password.'});
    }
    const name = user.firstName
    const mail= user.email

    const token = tokenCreated(name, mail)
    return res.status(200).send({ message: 'logged user', data: {
        token:token
    }});
  } catch (err) {
    return res.status(500).send({
      message: `Something has gone wrong with the server. Please contact us if the problem persists.`,
      error: err,
    });
  }
};
