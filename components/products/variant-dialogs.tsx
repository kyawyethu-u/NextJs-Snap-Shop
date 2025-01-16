"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { VariantsWithImagesTags } from '@/lib/infer-types'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { VariantSchema } from '@/types/variant-schema'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import TagsInput from './tags-input'
import VariantImages from './varinat-images'
import { useAction } from 'next-safe-action/hooks'
import { createVariant } from '@/server/actions/variants'
import { toast } from 'sonner'

type VariantProps = {
    children: React.ReactNode,
    editMode: boolean,
    productID?: number,
    variant?: VariantsWithImagesTags,
}
const VariantDialog = ({children,editMode,productID,variant}:VariantProps) => {
  const [open,setOpen] = useState(false)
  const form = useForm<z.infer<typeof VariantSchema>>({
    resolver: zodResolver(VariantSchema),
    defaultValues: {
      tags : [],
      variantImages: [],
      color: "#000000",
      productID,
      id: undefined,
      productType: "Black",
      editMode,
    },
  })

  const {execute,status,result} = useAction(createVariant, {
    onSuccess({data}) {
      setOpen(true)
      if(data?.error){
        toast.error(data.error)
        form.reset();
      }
     if(data?.success){
      toast.success(data?.success);
     }
    }
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof VariantSchema>) {
    const {color,tags,id,variantImages,editMode,productID,productType} = values
    execute({color,tags,id,variantImages,editMode,productID,productType})
  }

  return <Dialog open={open} onOpenChange={setOpen} >
    <DialogTrigger>{children}</DialogTrigger>
    <DialogContent className='h-[50rem] overflow-scroll'>
        <DialogHeader>
            <DialogTitle>{editMode ? "Update an existing" : "Create an existing"} product's variant</DialogTitle>
            <DialogDescription>Manage your products' variants. </DialogDescription>
        </DialogHeader>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your variant's title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
           )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant color</FormLabel>
              <FormControl>
                <Input type="color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
           )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant Tags</FormLabel>
              <FormControl>
                <TagsInput {...field} handleOnChange={(e)=>field.onChange(e)}/>
              </FormControl>
              <FormMessage />
            </FormItem>
           )}
        />
          <VariantImages />
          <Button type="submit">
            {editMode ? "Update product's variant" : "Create product's variant"}
          </Button>
        </form>
        </Form>
    </DialogContent>
  </Dialog>
}

export default VariantDialog