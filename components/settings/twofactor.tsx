"use client"
import React, { useEffect } from 'react'
import SettingsCard from './settings-card'
import { Button } from '../ui/button'
import { Check, X } from 'lucide-react'
import { auth } from '@/server/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { twoFactorSchema } from '@/types/setting-schema'
import { useAction } from 'next-safe-action/hooks'
import { z } from 'zod'
import {  twoFactorToggler } from '@/server/actions/setting-action'
import { toast } from 'sonner'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import { Switch } from '../ui/switch'

type TwoFactorProps = {
  isTwoFactorEnabled: boolean;
  email: string;
}

const TwoFactor = ({isTwoFactorEnabled,email}: TwoFactorProps) => {
  const form = useForm({
    resolver: zodResolver(twoFactorSchema),
    defaultValues : {
      isTwoFactorEnabled,
      email
    }
  })

  const {execute,status,result} = useAction(twoFactorToggler, {
    onSuccess({data}) {
      form.reset();
      if(data?.error){
        toast.error(data.error)
      }
     if(data?.success){
      toast.success(data?.success);
     }
    }
  })

  const onSubmit = (values : z.infer<typeof twoFactorSchema>) =>{
      const {isTwoFactorEnabled,email} = values
      execute({isTwoFactorEnabled,email})
  }

  useEffect(()=>{
    form.setValue("isTwoFactorEnabled",isTwoFactorEnabled)
  },[isTwoFactorEnabled,form])

  return <SettingsCard>
     <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
       
              <FormField 
              name="isTwoFactorEnabled" 
              control={form.control} 
              render={({field})=>(
              <FormItem>
                <FormLabel>Two Factor Authentification</FormLabel>
                <FormDescription>
                  {isTwoFactorEnabled ? "Disable" : "Enable"} two factor authentification
                </FormDescription>
                <FormControl>
                  <Switch
                   disabled={status === "executing"} 
                   checked={field.value} //defaultValues
                   onCheckedChange={field.onChange}
                  />
                </FormControl>
               
              </FormItem>)}/>

            <Button className={cn("w-full mb-4 mt-2",
              status === "executing" && "animate-pulse",
              isTwoFactorEnabled ? "bg-red-500 hover:bg-red-600" : "bg-primary")}
              disabled={status === "executing"}>
               {isTwoFactorEnabled ? "Disable" : "Enable"}
            </Button>
        </form>
          
        </Form>
  </SettingsCard>
}

export default TwoFactor