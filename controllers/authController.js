import { loginUser, registerUser } from "../services/authService.js";
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const token = await loginUser(email, password);
  if (token.status !== 200) {
    return res.status(token.status).json({ message: token.message });
  }

  return res.status(token.status).json({
    token,
  });
};

export const register = async (req, res) => {
  const { Name, email, password } = req.body;
  if (!Name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }
  const result = await registerUser(Name, email, password);
  return res.status(result.status).json({
    message: result.message,
  });
};
