"use client"
import { useSidebar } from "@/components/ui/sidebar"
import ThemeToggle from "@/components/ui/ThemeToggle"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"

export default function AppNavbar() {
  const { toggleSidebar } = useSidebar()
  return (
    <header>
      <nav className="flex items-center justify-between p-4">
        <div
          className="flex items-center cursor-pointer hover:opacity-80 transition-all duration-300 "
          onClick={toggleSidebar}
        >
          <Image src="/croc.svg" alt="Logo" width={70} height={70} priority />
          <h2 className="text-2xl font-extrabold dark:text-white">
            Expense<span className="text-green-600">Share</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserButton />
        </div>
      </nav>
    </header>
  )
}
