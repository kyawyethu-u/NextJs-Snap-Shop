import * as z from "zod"

export const settingsSchema= z.object({
    name: z.string().min(4,{
        message: "Please enter atleast 4 characters!"
    }),
    email: z.string().email({
        message: "Please enter a valid email address!"
    }).optional()
})