import { z } from "zod";

export const contactSchema = z.object({
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .min(8, "Phone number must be at least 8 digits")
    .max(15, "Phone number must be less than 15 digits"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const contactDefaultValues = {
  email: "",
  phone: "",
  message: "",
};