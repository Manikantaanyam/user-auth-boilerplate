import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema } from "../schemas/zodSchema.js";

export const login = async (req, res, User, secret_key) => {
  const { email, password } = req.body;
  const parseData = loginSchema.safeParse(req.body);

  if (!parseData.success) {
    return res
      .status(400)
      .json({ msg: "Incorrect Inputs", error: parseData.error.issues });
  }

  try {
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const comparePassword = await bcrypt.compare(password, userExists.password);

    if (!comparePassword) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    const token = await jwt.sign({ userId: userExists._id }, secret_key);
    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ msg: "Internal server error" }, e);
  }
};
