import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 8 characters"),
});

export const FlashcardFormValidation = z.object({
  question: z.string().min(2, "Question must be at least 2 characters"),
  answer: z.string().min(2, "Answer must be at least 2 characters"),
  deck: z.string(),
  lastReviewed: z.coerce.date(),
});

export const DeckFormValidation = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
});
