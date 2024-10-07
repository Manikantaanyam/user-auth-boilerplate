import zod from "zod";

export const signupSchema = zod.object({
  name: zod.string().min(3, "name must be at least 3 characters long"),
  email: zod.string().email("Invalid email"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = zod.object({
  email: zod.string().email("Invalid email"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
});
