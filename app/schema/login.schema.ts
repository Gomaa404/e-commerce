import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("Email is required")
    .email("Please enter a valid email address")
    .regex(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com)$/i,
      "Email must be from gmail.com or outlook.com"
    ),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});