
import * as z from "zod"

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address!"
  }),
  password: z.string().min(5,{
    message: "Please enter a valid password!"
  }),
  code: z.string().optional()
 })
 
