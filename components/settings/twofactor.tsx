import React from 'react'
import SettingsCard from './settings-card'
import { Button } from '../ui/button'
import { Check, X } from 'lucide-react'

const TwoFactor = () => {
  return <SettingsCard>
    <div className="flex items-center justify-between">
    <p className='text-sm font-medium'>Two Factor Authentication</p>
    {
      false ? 
      <Button className='bg-green-600 text-white hover:bg-red-500' size={"sm"}>
        <Check className="w-4 h-4 me-1"/>Enable</Button> :
      <Button className='bg-red-600 text-white hover:bg-red-500' size={"sm"}>
        <X className='w-4 h-4 me-1'/>Disable</Button>
    }
    </div>
  </SettingsCard>
}

export default TwoFactor