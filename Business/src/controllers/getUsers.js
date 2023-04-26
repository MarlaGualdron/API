import userModel from '../models/user.js';


export const getUsers = async (req, res) => {
  try {

    const users = await userModel.find({ });

    if (users.length === 0) {
      return res.status(204).send({ message:"No registered users" })
    }

    return res.status(200). send({message: "Users list", data: {
      firstName:users[0].firstName,
      lastnName:users[0].lastName,
      email: users[0].email
    }})

  } catch (err) {
    return res.status(500).send({
      message: `Something has gone wrong with the server. Please contact us if the problem persists.`,
      error: err,
    });
  }
};
