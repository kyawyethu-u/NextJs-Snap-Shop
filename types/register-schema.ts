

import * as z from "zod"

export const registerSchema = z.object({
    username: z.string().min(4,{
        message: "Please enter valid username!"
    }),
    email: z.string().email({
        message: "Please enter valid email!"
    }),
    password: z.string().min(5,{
        message: "Please enter valid password!"
    })
})