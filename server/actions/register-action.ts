"use server"

import { registerSchema } from "@/types/register-schema"
import { actionClient } from "./safe-action"

import bcrypt from "bcrypt"
import { db } from ".."
import { eq } from "drizzle-orm"
import { users } from "../schema"
import { generateEmailVerificationToken } from "./token"
import { sendEmail } from "./email"

export const register = actionClient
        .schema(registerSchema)
        .action(async({parsedInput: {name,email,password}})=>{
            console.log("I am server action =>",name,email,password)
            const hashedPassword = await bcrypt.hash(password,10)
           
            
           //check user exist
           const existingUser = await db.query.users.findFirst({
            where : eq(users.email,email)})
            if(existingUser){
                if(!existingUser.emailVerified){
                      //generate verificationToken for email expires in 30 minutes
                   const verificationToken =  await generateEmailVerificationToken(email);
                    //send verification email
                    await sendEmail(verificationToken[0].email,
                        verificationToken[0].token,
                        name.slice(0,5)
                    )
                    return {success: "Email verification sent!"}
                }
                return {error: "Email is already exist"}
            } 
            //create user
            await db.insert(users).values({
                name,
                email,
                password: hashedPassword,
            })
            //generate verificationToken for email expires in 30 minutes
            const verificationToken =  await generateEmailVerificationToken(email);
            // send verification email
            await sendEmail(verificationToken[0].email,
                verificationToken[0].token,
                name.slice(0,5)
            )
            return {success: "Email verification sent!"}
        })