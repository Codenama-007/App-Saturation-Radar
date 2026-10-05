import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { SidebarInset } from '@/components/ui/sidebar'
import {DemoSidebar} from '@/components/DemoSidebar'
import DemoContent from '@/components/DemoContent'

const page = () => {
  return (
    <SidebarProvider>
        <DemoSidebar/>

    <SidebarInset>
        <DemoContent/>
    </SidebarInset>
        
      
    </SidebarProvider>
  )
}

export default page
