const { registerUser, getAllUser, logInUser } = require("../queries/userQuery");

const register = async (req, res, next) => {
  const token = await registerUser(req.body);
  res.send(token);
};

// login 
const login = async(req, res, next) => {
  try {
    console.log(req.body)
    const user = await logInUser(req.body);
    res.send(user)
  } catch (error) {
    next(error)
  }
}

const displayAll = async (req, res, next) => {
  const users = await getAllUser();
  res.send(users);
};
module.exports = {
  register,
  displayAll,
  login
};
