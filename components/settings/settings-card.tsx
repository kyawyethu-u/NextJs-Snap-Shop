import React from "react"
import { Card,
   CardContent,
   CardHeader, 
   CardTitle ,
   CardDescription} from "../ui/card"



type SettingsCardProps = {
    children: React.ReactNode,
    title?: string,
    description?:string  
}
// ? mean optional

const SettingsCard = ({children,title,description} : SettingsCardProps) => {
  return (
    <Card>
        <CardHeader>
         { title && description && (<>
         <CardTitle>{title}</CardTitle>
         <CardDescription>{description}</CardDescription>
         </>)}
         {children}
          </CardHeader>
    </Card>
  )
}

export default SettingsCard