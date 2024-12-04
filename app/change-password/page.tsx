"use client"

import AuthForm from '@/components/auth/auth-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { reset } from '@/server/actions/reset-action'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from "zod"

import { changePasswordSchema } from '@/types/change-password-schema'
import { changePasswordAction } from '@/server/actions/changePassword-action'
import { useSearchParams } from 'next/navigation'

const changePassword = () =>{
  const form=useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: ""
    }
  })
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const {execute,status,result} = useAction(changePasswordAction,{
    onSuccess({data}){
      form.reset();
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

  const onSubmit =(values: z.infer<typeof changePasswordSchema>) =>{
      const {password} = values;
      execute({token, password})
  }


  return(
    <AuthForm formTitle='Change Your Password'
        footerLabel='Already have an account?'
        footerHref='/auth/login'
        showProvider={false}>
          <Form {...form}>  
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField name="password" control={form.control} render={({field}) => (<FormItem>
                   <FormLabel>New Password</FormLabel>
                   <FormControl>
                      <Input placeholder='****' {...field} type="password"/>
                   </FormControl>
                   <FormMessage/>
              </FormItem>)}/>
            </div>
                <Button className={cn("w-full mb-4 mt-4",
                  status === "executing" && "animaate-pulse")}
                  disabled = {status === "executing"}>
                  Change Password
                </Button>
            </form>
         </Form>
    </AuthForm>
  )
}

export default changePassword