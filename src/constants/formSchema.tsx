import { z } from "zod"

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(30, "Name must be at most 50 characters"),
  description: z.string().min(2, "Description must be at least 2 characters").max(500, "Description must be at most 500 characters"),
});