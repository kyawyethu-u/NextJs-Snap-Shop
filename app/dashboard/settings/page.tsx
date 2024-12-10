import ChangePassword from '@/components/settings/change-password'
import ProfileCard from '@/components/settings/profile-card'
import SettingsCard from '@/components/settings/settings-card'
import TwoFactor from '@/components/settings/twofactor'
import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Settings =async () => {
  const session = await auth()
  if(!session?.user) return redirect("/")

  return (
  <SettingsCard title={"Settings"} description={"Manage your account setting"}>
    <main className='flex flex-1 flex-col lg:flex-row gap-4'>
    <div className='flex-1'>
        <ProfileCard session={session} />
    </div>
    <div className='space-y-4 flex-1'>
       
       {
        !session.user.isOath && (<><ChangePassword email={session.user.email!}/>
        <TwoFactor/>
        </>) 
       }
    </div>
  </main>
  </SettingsCard>)
}

export default Settings