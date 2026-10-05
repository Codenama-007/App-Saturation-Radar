import React from 'react'
import {SidebarProvider} from "@/components/ui/sidebar"
import AppSidebar from '@/components/AppSidebar'
import ChatComponent from '@/components/ChatComponent'
import { SidebarInset } from '@/components/ui/sidebar'



const page = () => {
  return (
    <SidebarProvider>
        <AppSidebar/>

    <SidebarInset>
        <ChatComponent/>
    </SidebarInset>
        
      
    </SidebarProvider>
  )
}

export default page
