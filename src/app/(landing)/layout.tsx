import { ReactNode } from "react"
import LandingNavbar from "./_components/Navbar"
import Image from "next/image"

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background image */}
      <Image
        src="/airplane.jpg"
        alt="Airplane flying above the clouds"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1">
        <LandingNavbar />
        {children}
      </div>
    </div>
  )
}
