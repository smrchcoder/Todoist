import prisma from "../database/connection.js";
export const loginUser = async (email, password) => {
  // Simulate a database call to check if the user exists
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log(user);

  // If user is not found, return an error
  if (!user) {
    return { status: 404, message: "User not found" };
  }

  // Check if the password is correct
  const isPasswordCorrect = await verifyPassword(password, user.password);
  if (!isPasswordCorrect) {
    return { status: 401, message: "Invalid password" };
  }

  // If everything is correct, return success message
  return { status: 200, message: "Login successful" };
};
const verifyPassword = async (inputPassword, storedPassword) => {
  return inputPassword === storedPassword; // Simulated password verification
};

export const registerUser = async (name, email, password) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existingUser) {
    return {
      status: 409,
      message: "User already exists",
    };
  }
  const user = await prisma.user.create({ data: { name, email, password } });
  if (!user) {
    return {
      status: 500,
      message: "Error creating user",
    };
  }
  return {
    status: 201,
    message: `User ${user.name} registered successfully`,
  };
};
