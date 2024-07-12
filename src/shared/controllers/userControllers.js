const { registerQuery } = require("../queries/userQuery");

const register = async (req, res) => {
  const token = await registerQuery(req.body);
  res.send(token);
};

module.exports = {
  register,
};
