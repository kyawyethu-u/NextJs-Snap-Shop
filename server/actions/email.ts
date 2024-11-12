"use server"
import {getBaseUrl} from "@/lib/get-baseUrl"
import {Resend} from "resend"
import EmailConfirmationTemplate from "@/components/email-template";


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

        
   