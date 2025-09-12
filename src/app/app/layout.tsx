import { ReactNode } from "react"
import AppNavbar from "./_components/Navbar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/Sidebar"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen">
        <div className="flex-shrink-0">
          <AppSidebar />
        </div>

        <div className="flex-1 flex flex-col ">
          <AppNavbar />
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}
