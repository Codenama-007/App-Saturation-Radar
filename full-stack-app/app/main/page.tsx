import React from 'react'
import {SidebarProvider} from "@/components/ui/sidebar"
import AppSidebar from '@/components/AppSidebar'
import ChatComponent from '@/components/ChatComponent'
import { SidebarInset } from '@/components/ui/sidebar'
import AuthGuard from '@/components/AuthGuard'

const page = () => {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar/>

        <SidebarInset>
          <ChatComponent/>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}

export default page