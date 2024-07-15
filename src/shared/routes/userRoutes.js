const { routes } = require("../shared");
const { findUserByToken } = require("../queries/userQuery");
const { register, displayAll } = require("../controllers/userControllers");

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserByToken(req.headers.authorization);
    next();
  } catch (error) {
    next(error);
  }
};

routes.post("/register", register);
routes.get("/all_users", isLoggedIn, displayAll);

module.exports = routes;
