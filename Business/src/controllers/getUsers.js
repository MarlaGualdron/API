import userModel from '../models/user.js';


export const getUsers = async (req, res) => {
  try {
    const {page, email, limit} = req.query
    const limitVal = (!limit)? 10 : limit
    const emailQuery = (!email)? {} : { email: { $regex : new RegExp(email,"i") } }
    const options = {
      page: (!page)? 1 : page,
      limit: limitVal,
    };
    console.debug(options, emailQuery)
    userModel.paginate(emailQuery, options, (err,result) => {
      if (err) {
        return res.status(204).send({ message: err })
      }
      
      return res.status(200). send({
        message: "Users list",
        data: result.docs.map((u) => ({first_name: u.firstName, last_name: u.lastName, email: u.email}))
      });
    })
  } catch (err) {
    return res.status(500).send({
      message: `Something has gone wrong with the server. Please contact us if the problem persists.`,
      error: err,
    });
  }
};
