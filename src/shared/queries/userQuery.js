const { bcrypt, client, uuid, jwt, prisma } = require("../shared");
const JWT = process.env.JWT || "123456";

const registerUser = async ({ password, firstName, lastName, email }) => {
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      password: hashPassword,
      firstName,
      lastName,
      email,
    },
  });

  const token = await jwt.sign({ id: newUser.id }, JWT, {
    expiresIn: "1h",
  });
  return token;
};

const logInUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  console.log(user);
  // error handling
  if (!user) {
    const error = Error("User not found");
    error.status = 404;
    throw error;
  }
  // use bcrypt compare for the password, and return users information and json web token
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    const error = Error("Password not found");
    error.status = 401;
    throw error;
  }

  const token = await jwt.sign({ id: user.id }, JWT, {
    expiresIn: "1h",
  });
  return token;
};

const getAllUser = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const findUserByToken = async (header) => {
  const token = header?.split(" ")[1];
  let id = "";
  try {
    const payload = await jwt.verify(token, JWT);
    id = payload.id;
  } catch (ex) {
    const error = Error("Not Authorized");
    error.status = 404;
    throw error;
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  return user;
};

const deleteUserById = async(id) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id,
      }
    });
    
    return user
  } catch (error) {
    console.error( `Error deleting user with ${id}: `, error)
    throw new Error("failed to delete user")
  }
}


module.exports = {
  registerUser,
  getAllUser,
  findUserByToken,
  prisma,
  logInUser,
  deleteUserById,
};
