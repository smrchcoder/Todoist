import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader && !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};
export default authenticate;
