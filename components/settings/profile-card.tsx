"use client"
import { Session } from 'next-auth'
import React, { useState } from 'react'
import SettingsCard from './settings-card'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { UserRoundPen } from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from '../ui/button'
import useMediaQuery from '@/hooks/useMediaQuery'
import ProfileForm from './profile-form'
import AvatarUploadForm from './avatar-upload-form'




type ProfileCardProps ={
  session: Session
}
const ProfileCard = ({session}: ProfileCardProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
 
  const [isOpen,setIsOpen] = useState(false);
  const handleisOpen = () =>{
    setIsOpen(false);
  }

  return (<SettingsCard>
    <div className='flex items-start gap-2 justify-between'>
    <div className='flex items-start gap-2'>
     <AvatarUploadForm
      name={session.user?.name!}
      image={session.user.image} 
      email={session.user.email!}/>
      <div>
      <h2 className='font-semibold text-lg'>{session.user?.name}</h2>
      <p className='text-sm font-medium text-muted-foreground'>{session.user?.email}</p>
      </div>
    </div>
    
  {
    isDesktop ? <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild>
    <UserRoundPen className='w-5 h-5 text-muted-foreground hover:text-black cursor-pointer'/>
    </DialogTrigger>
    <DialogContent className='mx-4 lg:mx-0'>
      <DialogHeader >
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>This will be your public display name.</DialogDescription>
      </DialogHeader>
      <ProfileForm 
      name={session.user?.name!} 
      email={session.user?.email!}
      setIsOpen = {handleisOpen}
      />
      
     
         <DialogClose >
         <Button variant={'outline'} className='w-full'>Cancel</Button>
         </DialogClose>
      
    </DialogContent>
    </Dialog> : 
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
    <DrawerTrigger asChild>
      <UserRoundPen className='w-5 h-5 text-muted-foreground hover:text-black cursor-pointer'/>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Edit profile</DrawerTitle>
        <DrawerDescription>This will be your public display name.</DrawerDescription>
      </DrawerHeader>
      <ProfileForm 
      name={session.user?.name!} 
      email={session.user?.email!}
      setIsOpen={handleisOpen}/>
      
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline" className='w-full'>Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  
  }
  </div>
  </SettingsCard>
)}

export default ProfileCard