"use server"

import { resetPasswordSchema } from "@/types/reset-password-schema"
import { actionClient } from "./safe-action"
import { db } from "@/server"
import { eq } from "drizzle-orm"
import { users } from "../schema"
import { generateResetPasswordToken } from "./token"
import { sendPasswordResetEmail } from "./email"


export const reset = actionClient
    .schema(resetPasswordSchema)
    .action(async({parsedInput : {email}}) => {
        const existingUser = await db.query.users.findFirst({where: eq(users.email,email)});
        if(!existingUser) return {error: "Email not found"};
        
        const passwordResetToken = await generateResetPasswordToken(email);
        if(!passwordResetToken){
            error: "Failed to generate password reset token"
        };
            await sendPasswordResetEmail(
                passwordResetToken[0].email,
                passwordResetToken[0].token
            );
            return {success: "Password reset email sent"}
    })


