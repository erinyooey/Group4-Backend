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
      username: true,
    },
  });

  return user;
};

module.exports = {
  registerUser,
  getAllUser,
  findUserByToken,
  prisma,
};
