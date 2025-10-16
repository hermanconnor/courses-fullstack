import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required").trim(),

    lastName: z.string().min(1, "Last name is required").trim(),

    emailAddress: z.string().min(1, "Email is required").email().trim(),

    password: z.string().min(1, "Password is required").trim(),

    confirmPassword: z.string().min(1, "Required").trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signupSchema>;
