const { registerUser, getAllUser } = require("../queries/userQuery");

const register = async (req, res, next) => {
  const token = await registerUser(req.body);
  res.send(token);
};

const displayAll = async (req, res, next) => {
  const users = await getAllUser();
  res.send(users);
};
module.exports = {
  register,
  displayAll,
};
