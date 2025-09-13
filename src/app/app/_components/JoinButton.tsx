"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import JoinModal from "./JoinModal"

export default function JoinButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <Button
        className="cursor-pointer hover:scale-105"
        onClick={() => setIsModalOpen(true)}
      >
        + Join Group
      </Button>

      <JoinModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
