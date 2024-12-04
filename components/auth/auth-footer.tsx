import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'


type AuthFooterProps = {
    footerLabel: string,
    footerHerf: string
}

const AuthFooter = ({footerHerf,footerLabel}: AuthFooterProps) => {
  return (
   <Button variant={"link"} asChild className='w-full'>
     <Link href={footerHerf}>{footerLabel}</Link>
   </Button>
    
  )
}

export default AuthFooter