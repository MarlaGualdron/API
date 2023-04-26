import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv' 
dotenv.config()
const accessToken = process.env.accessToken;

export const tokenCreated = (firstName, email) => {
    const payload = {
      sub:  firstName,
      name: email,
      rol: "user"
    };
    return jwt.sign(payload, accessToken);
  };

  export const userLogged = async (req, res) => {
    try {
      let authorization = req.headers.authorization;
      if (!authorization || authorization.split(' ')[1] === undefined) return res.sendStatus(403);
  
      const decoded= jwt.decode(authorization.split(" ")[1]);
      const user = await userModel.find({ email: email}).exec();
      const email = user[0].email
      if (decoded.name === email && decoded.rol === "user") {
        next();
      } else {
        return res.status(401).send({ message: "No tienes autorizaciòn" });
      }

    } catch (err) {
        return res.status(500).send({
            message: `Something has gone wrong with the server. Please contact us if the problem persists.`,
            error: err
          });
    }
  };
  