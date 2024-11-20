"use client"

import AuthForm from '@/components/auth/auth-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { registerSchema } from '@/types/register-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"

import {useAction} from "next-safe-action/hooks"
import { register } from '@/server/actions/register-action'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'




const Register = () => {
 const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues:{
      name: "",
      email: "",
      password: ""
    }
 })

 const {execute,status,result} = useAction(register,{
      onSuccess({data}) {
        form.reset();
        if(data?.error){
          toast.error(data.error)
        }
       if(data?.success){
        toast.success(data?.success,{
          action:{
            label: "Open Gmail",
            onClick: () =>{window.open("https://mail.google.com","_blank");
            },
          },
        });
       }
      }
    })

 const onSubmit = (values: z.infer<typeof registerSchema>)=> {
      const {name,email,password} = values;
        execute({name,email,password})
 }
  return (
    <AuthForm formTitle='Register new account' 
    footerHerf='/auth/login'
    footerLabel='Already have an account?'
    showProvider>
       <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)}>
       <div>
          <FormField control={form.control} name="name" render={({field})=>(
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='username' {...field}/>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}/>
          <FormField control={form.control} name="email" render={({field})=>(
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='snapshop@gmail.com' {...field}/>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}/>
          <FormField control={form.control} name="password" render={({field})=>(
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='*****' {...field} type='password'/>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}/>
        </div>
        <Button className={cn("w-full mb-4",
              status === "executing" && "animate-pulse")}
              disabled={status === "executing"}>Register</Button>
       </form>
       </Form>
    </AuthForm>
  )
}

export default Register