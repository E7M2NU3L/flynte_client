import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <main className='min-h-screen flex flex-col'>
        <SidebarProvider>
            <AppSidebar />
            <main className='relative flex-1'>
                <main className='absolute top-1 right-1'>
                    <SidebarTrigger />
                </main>
                <Outlet />
            </main>
        </SidebarProvider>
    </main>
  )
}

export default Main