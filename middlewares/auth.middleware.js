import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
