import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingNavbar() {
  return (
    <header>
      <nav className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Image src="/croc.svg" alt="Logo" width={70} height={70} priority />
          <h2 className="text-2xl font-extrabold text-white">
            Expense<span className="text-green-600">Share</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={"outline"} className="cursor-pointer" asChild>
            <Link href="/sign-in">
              <LogIn /> Sign In
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
