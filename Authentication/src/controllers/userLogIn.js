import userModel from '../models/user.js';
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator';
import { tokenCreated } from '../middleware/auth.js';

export const userLogIn = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.find({ email: email}).exec();

    if(user.length === 0){
        return res.status(404).send({message: "usuario no encontrado"})
    }

    const match = await bcrypt.compare(password, user[0].password);
    if (match === false) {return res.status(400).send('Contraseña incorrecta');}
    const name = user[0].firstName
    const mail= user[0].email

    const token = tokenCreated(name, mail)
    return res.status(200).send({ message: 'logged user', data: {
        firstName : user[0].firstName,
        lastname : user[0].lastName,
        nema: user[0].email,
        token:token
    }});
  } catch (err) {
    return res.status(500).send({
      message: `Something has gone wrong with the server. Please contact us if the problem persists.`,
      error: err,
    });
  }
};
