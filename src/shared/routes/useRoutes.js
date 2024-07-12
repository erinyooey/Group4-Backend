const { route } = require("../shared/shared");
const { register } = require("../controllers/userControllers");
route.post("/register", register);

module.exports = route;
