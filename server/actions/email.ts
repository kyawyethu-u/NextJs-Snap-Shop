"use server"
import {getBaseUrl} from "@/lib/get-baseUrl"
import {Resend} from "resend"
import EmailConfirmationTemplate from "@/components/email-template";
import resetPasswordEmail from "@/components/password-reset-email-template";
import twoFactorCodeEmail from "@/components/two-factor-email";


const resend = new Resend(process.env.RESEND_API_KEY);
const currentBaseUrl = getBaseUrl();
export const sendEmail = async(email:string,token:string,userFirstname: string) =>{
        const confirmLink = `${currentBaseUrl}/confirm-email?token=${token}`

        const { data, error } = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email,
                subject: 'Account Confirmation Email-SnapShop',
                react: EmailConfirmationTemplate({
                        userFirstname,
                        confirmEmailLink: confirmLink
                }),
              });
            
              if (error) {
               console.log(error);
               
              }
            };


 export const sendPasswordResetEmail = async(email:string,token:string) =>{
         const resetLink = `${currentBaseUrl}/change-password?token=${token}`
        
         const { data, error } = await resend.emails.send({
                        from: 'onboarding@resend.dev',
                        to: email,
                        subject: 'Reset your account - Welcome to SnapShop',
                        react: resetPasswordEmail({
                                resetPasswordLink: resetLink
                        })
                      });
                    
                      if (error) {
                       console.log(error);
                      }
                    };

 export const sendTwoFactorEmail = async(email:string,code:string) =>{
                 
        const { data, error } = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email,
                subject: 'Two Factor Authentication Code - SnapShop',
                react: twoFactorCodeEmail({
                  code,
                })
                });
                
                if (error) {
                console.log(error);
                }
                };                   
        
                
           