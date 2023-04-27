import jwt from 'jsonwebtoken';
import userModel from '../models/user.js'

export const userLogged = async (req, res, next) => {
  try {
    let authorization = req.headers.authorization;
    if (authorization === undefined) {
      return res.status(401).send({ message: "Unauthorized." });
    }
    const auth_sent = authorization.split(" ")[1];
    if (auth_sent === undefined) return res.status(401).send({ message: "Unauthorized." });

    const decoded = jwt.decode(auth_sent);
    if (decoded === null) return res.status(401).send({ message: "Unauthorized." });

    if (!decoded.name || decoded.rol !== "user") {
      return res.status(401).send({ message: "Unauthorized." });
    }

    console.debug(decoded)
    const user = await userModel.findOne({ firstName: decoded.sub, email: decoded.name}).exec();
    console.debug(user)
    if (user) {
      console.debug('Business - middleware userLogged passed')
      next();
    } else {
      res.status(403).send({ message: "Forbidden." });
    }

  } catch (err) {
      return res.status(500).send({
        message: `Something has gone wrong with the server. Please contact us if the problem persists.`,
        error: err
      });
  }
};
  