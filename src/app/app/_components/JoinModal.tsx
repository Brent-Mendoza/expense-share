"use client"

import { Button } from "@/components/ui/button"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { FieldValues, useForm } from "react-hook-form"
import z from "zod/v3"

type JoinModalProps = {
  isOpen: boolean
  onClose: () => void
}

interface ApiResponse {
  message?: string
  groupName?: string
  error?: string
}

const InviteCodeSchema = z.object({
  inviteCode: z.string().min(1, "Please enter the invite code..."),
})

export default function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(InviteCodeSchema),
  })

  const onSubmit = async (data: FieldValues) => {
    try {
      setApiResponse(null)

      const response = await fetch("/api/groups/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result: ApiResponse = await response.json()

      if (response.ok) {
        setApiResponse(result)
        reset()

        setTimeout(() => {
          router.refresh()
          handleClose()
        }, 2000)
      } else {
        setApiResponse(result)
      }
    } catch (error) {
      console.error("Network error:", error)
      setApiResponse({ error: "Network error occurred" })
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative ">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 "
          type="button"
        >
          <X className="h-5 w-5 cursor-pointer" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-600">Join Group</h2>
        {/* Success Message */}
        {apiResponse?.message && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            <p>{apiResponse.message}</p>
            {apiResponse && (
              <p className="mt-2">
                <strong>Joined:</strong> {apiResponse.groupName}
              </p>
            )}
          </div>
        )}

        {/* Error Message */}
        {apiResponse?.error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p>{apiResponse.error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="inviteCode"
              className="block text-sm font-medium mb-2"
            >
              Invite Code
            </label>
            <input
              type="text"
              id="inviteCode"
              placeholder="Enter invite code..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent uppercase text-gray-500"
              {...register("inviteCode")}
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase()
              }}
            />
            {errors.inviteCode && (
              <p className="text-red-500 text-sm mt-1">{`${errors.inviteCode.message}`}</p>
            )}
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 bg-black text-white cursor-pointer hover:bg-gray-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 cursor-pointer hover:bg-gray-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Joining...
                </>
              ) : (
                "Join Group"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
