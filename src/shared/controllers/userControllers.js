const { registerUser, getAllUser, logInUser, deleteUserById } = require("../queries/userQuery");

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
  console.log("hello")
  const users = await getAllUser();
  res.send(users);
};

const deleteUser = async(req, res, next) =>{
  try {
    const user = await deleteUserById(req.params.id)
    res.send({message: "User deleted successfully: ", user})
  } catch (error) {
    next(error)
    res.status(500).send({error: "Failed to delete user"})
  }
}

module.exports = {
  register,
  displayAll,
  login,
  deleteUser
};
