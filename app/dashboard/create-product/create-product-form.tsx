"use client"
import React, { useEffect, useState } from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from "react-hook-form" 
import { productSchema } from '@/types/product-schema'

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'
import Tiptap from './tip-tap'
import { useAction } from 'next-safe-action/hooks'
import { getSingleProduct, updateProduct } from '@/server/actions/product'
import { toast } from 'sonner'
import {  useRouter, useSearchParams } from 'next/navigation'

const CreateProductForm = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit_id") || null
  const [editProduct,setEditProduct] = useState<string>("")

  const isProductExist = async(id: number) =>{
      const response = await getSingleProduct(id)
      if(response.error){
        toast.error(response.error)
        router.push("/dashboard/products")
        return
      }
      if(response.success){
        setEditProduct(response.success.title)
        form.setValue("title",response?.success?.title)
        form.setValue("description",response?.success?.description)
        form.setValue("price",response?.success?.price)
        form.setValue("title",response?.success?.title)
      }
  }
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,

    }
  })
  const {execute,status,result} = useAction(updateProduct, {
    onSuccess({data}) {
      form.reset();
      if(data?.error){
        toast.error(data.error)
      }
     if(data?.success){
      toast.success(data?.success);
      form.reset();
      router.push("/dashboard/products")
     }
    }
  })
  const onSubmit = (values: z.infer<typeof productSchema>) =>{
    const {title,id,description,price} = values
    execute({title,id,description,price})
  }
  useEffect(()=>{
    form.setValue("description","")
  },[form]);

  useEffect(()=>{
    if(isEditMode){
      isProductExist(Number(isEditMode))
    }
  },[])

  return <Card>
    <CardHeader>
      <CardTitle>{isEditMode ? "Edit" : "Create"} product</CardTitle>
      <CardDescription>{isEditMode ? `Edit your product: ${editProduct}` : "Create a new product"}</CardDescription>
    </CardHeader>
    <CardContent>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Title</FormLabel>
              <FormControl>
                <Input placeholder="T-shirts" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product description</FormLabel>
              <FormControl>
                <Tiptap val={field.value}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product price</FormLabel>
              <FormControl>
               <div className='flex items-center gap-2'>
               <DollarSign size={36} className='p-2 bg-muted rounded-md'/>
               <Input placeholder="Price must show in MMK" {...field} step={100} type="number" min={0}/>
               </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full' disabled={status === "executing"}>
          {isEditMode ? "Update product" : "Create product"}</Button>
      </form>
    </Form>
    </CardContent>
    
  </Card>
   
  
}

export default CreateProductForm