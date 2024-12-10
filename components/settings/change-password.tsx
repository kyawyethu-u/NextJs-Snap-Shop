"use client"

import React from 'react'
import SettingsCard from './settings-card'
import { KeyRound } from 'lucide-react'
import { resetPasswordSchema } from '@/types/reset-password-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { reset } from '@/server/actions/reset-action'

import * as z from "zod"
import { Form } from '@/components/ui/form'

type ChangePasswordProps = {
  email: string
}

const ChangePassword = ({email}: ChangePasswordProps) => {
  const form=useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email : email ? email : ""
    }
  })
  const {execute,status,result} = useAction(reset,{
    onSuccess({data}){
  
      if(data?.error){
        toast.error(data?.error)
      }
      if(data?.success){
        toast.success(data.success,{
          action: {
            label: "Open Gmail",
            onClick: () => {
              window.open("https://mail.google.com","_blank")
            }
          }
        })
      }
    }
    })
    const onSubmit =(values: z.infer<typeof resetPasswordSchema>) =>{
      console.log(values);
      
      const {email} = values;
      execute({email})
    }


  return <SettingsCard>
      <div className='flex items-center justify-between'>
      <p className='text-sm font-medium'>Change Password</p>
      <div className='flex justify-between items-center'>
         <Form {...form}>  
            <form onSubmit={form.handleSubmit(onSubmit)}>
    
                <Button className={cn("w-full mb-4 mt-4",
                  status === "executing" && "animaate-pulse")}
                  disabled = {status === "executing"}>
                  
                   <KeyRound className='w-5 h-5'/>
                </Button>
            </form>
         </Form>
      </div>
      </div>
  </SettingsCard>
    
  
}

export default ChangePassword