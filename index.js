import { signup } from "./controllers/signup.js";
import { login } from "./controllers/login.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

export { signup, login, authMiddleware };
