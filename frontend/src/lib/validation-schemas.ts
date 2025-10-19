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

export const signInSchema = z.object({
  emailAddress: z.email().min(1, "Email is required").trim(),

  password: z.string().min(1, "Password is required").trim(),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const courseSchema = z.object({
  title: z.string().min(1, "Please enter a course title").trim(),
  description: z.string().min(1, "A course description is required").trim(),
  estimatedTime: z.string().trim().optional(),
  materialsNeeded: z.string().trim().optional(),
});

export type CourseFormData = z.infer<typeof courseSchema>;
