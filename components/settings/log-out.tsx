"use client"

import React from 'react'
import SettingsCard from './settings-card'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

const LogOutBtn = () => {
  return (
    <SettingsCard>
    <h2 className='text-sm font-semibold mb-2 text-red-600'>See you</h2>
    <Button variant={"destructive"} onClick={()=>signOut()}>
      <LogOut  className="mb-2"/>Log out</Button>
   </SettingsCard>
  )
}

export default LogOutBtn