import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signupSchema } from "../schemas/zodSchema.js";

export const signup = async (req, res, User, secret_key) => {
  const { name, email, password } = req.body;
  const parseData = signupSchema.safeParse(req.body);

  if (!parseData.success) {
    return res
      .status(400)
      .json({ msg: "Incorrect Inputs", error: parseData.error.issues });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = await jwt.sign({ userId: user._id }, secret_key);

    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ msg: "Something error occured" });
  }
};
