import * as z from "zod"

export const registerSchema = z.object({
    name: z.string().min(4,{
        message: "Please enter valid username!"
    }),
    email: z.string().email({
        message: "Please enter valid email!"
    }),
    password: z.string().min(5,{
        message: "Password must be at least 4 character"
    })
})