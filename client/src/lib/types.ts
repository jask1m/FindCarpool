import { z } from 'zod';

export const courseSchema = z.object({
  name: z.string().nonempty("Name is required"),
  departureAddress: z.string()
    .regex(/^\d+\s+\S+.*$/, "Address must start with a number, followed by a street name")
    .nonempty("Address is required"),
  departureCity: z.string()
    .min(1, "City is required")
    .refine(value => /^[a-zA-Z\s'-]+$/.test(value), {
    message: "City must contain only letters"
  }),
  departureZip: z.string()
    .min(5, "Zipcode must be at least 5 characters")
    .max(10, "Zipcode cannot be more than 10 characters")
    .regex(/^\d{5}(-\d{4})?$/, "Invalid US zipcode format"),
  departureDateTime: z.string().nonempty("Departure date and time is required"),
  destinationAddress: z.string()
    .regex(/^\d+\s+\S+.*$/, "Address must start with a number, followed by a space and a street name")
    .nonempty("Address is required"),
  destinationCity: z.string()
    .min(1, "City is required")
    .refine(value => /^[a-zA-Z\s'-]+$/.test(value), {
    message: "City must contain only letters"
  }),
  destinationZip: z.string()
    .min(5, "Zipcode must be at least 5 characters")
    .max(10, "Zipcode cannot be more than 10 characters")
    .regex(/^\d{5}(-\d{4})?$/, "Invalid US zipcode format"),
  destinationDateTime: z.string().nonempty("Arrival date and time is required"),
});

export type TCourseSchema = z.infer<typeof courseSchema>;

export const authFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .regex(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(/^(?=.*\d)/, "Password must contain at least one number")
    .regex(/^(?=.*[!@#$%^&*])/, "Password must contain at least one special character"),
});

export type TAuthFormSchema = z.infer<typeof authFormSchema>;

export const authSignUpFormSchema = authFormSchema.extend({
  username: z.string().min(1, "Name is required"),
});

export type TAuthSignUpFormSchema = z.infer<typeof authSignUpFormSchema>;

export type TCarpoolOptions = "Create" | "View" | "Matches";