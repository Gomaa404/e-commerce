import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(40, "Name must be less than 40 characters"),

    email: z
      .string()
      .trim()
      .nonempty("Email is required")
      .email("Please enter a valid email address")
      .regex( /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com)$/i,"Email must be from gmail.com or outlook.com"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),

    rePassword: z.string().nonempty("Please confirm your password"),

    phone: z
      .string()
      .trim()
      .nonempty("Phone number is required")
      .regex(
        /^01[0125][0-9]{8}$/,
        "Phone number must start with 01 and have exactly 11 digits"
      ),
  })
  .refine((object) => object.password === object.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });
