import prisma from "../database/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
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
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return { status: 401, message: "Invalid password" };
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { status: 200, message: token };
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
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
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
