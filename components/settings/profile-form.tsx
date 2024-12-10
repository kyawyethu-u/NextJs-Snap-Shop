"use client"
import { updateDisplayName } from '@/server/actions/setting-action'
import { settingsSchema } from '@/types/setting-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

type ProfileFormProps = {
  name: string;
  email: string;
  setIsOpen: () => void;
}

const ProfileForm = ({name,email,setIsOpen}: ProfileFormProps) => {
  const form = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues : {
      name,
      email
    }
  })
  const {execute,status,result} = useAction(updateDisplayName, {
    onSuccess({data}) {
      form.reset();
      if(data?.error){
        toast.error(data.error)
      }
     if(data?.success){
      setIsOpen()
      toast.success(data?.success);
     }
    }
  })

  const onSubmit = (values : z.infer<typeof settingsSchema>) =>{
      const {name,email} = values
      execute({name,email})
  } //default value

  return (
   <main>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 px-4 lg:px-0'>
       
              <FormField name="name" control={form.control} render={({field})=>(<FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input placeholder='snapshop@admin' {...field}></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>)}/>
            
       
            <Button className={cn("w-full mb-4",
              status === "executing" && "animate-pulse")}
              disabled = {status === "executing"}>
                Save</Button>
        </form>
          
        </Form>
   </main>
  )
}


export default ProfileForm