import jwt from "jsonwebtoken";

export const authMiddleware = (secret_key) => {
  return async (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
      return res.status(400).json({ msg: "Token not provided" });
    }

    const token = header.split(" ")[1];
    if (!token) {
      return res.status(400).json({ msg: "Token not provided" });
    }
    try {
      const decoded = await jwt.verify(token, secret_key);
      req.userId = decoded.id;
      next();
    } catch (e) {
      return res.status(401).json({ msg: "Invalid token" });
    }
  };
};
