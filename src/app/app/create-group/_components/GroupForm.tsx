"use client"
import { Button } from "@/components/ui/button"
import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod/v3"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { redirect } from "next/navigation"

const GroupSchema = z.object({
  groupName: z.string().min(1, "Group name is required"),
  description: z.string().optional(),
  theme: z.string(),
})

interface ApiResponse {
  message?: string
  group?: {
    id: string
    name: string
    description: string
    theme: string
    inviteCode: string
  }
  error?: string
  details?: any[]
}

export default function GroupForm() {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(GroupSchema),
  })

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await fetch("/api/groups", {
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
        console.log("Group created:", result.group)
      } else {
        setApiResponse(result)
        console.error("Error:", result.error)
      }
    } catch (error) {
      console.error("Network error:", error)
      setApiResponse({ error: "Network error occurred" })
    }
  }

  return (
    <>
      {/* Success Message */}
      {apiResponse?.message && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <p>{apiResponse.message}</p>
          {apiResponse.group && (
            <p className="mt-2">
              <strong>Invite Code:</strong> {apiResponse.group.inviteCode}
            </p>
          )}
        </div>
      )}

      {/* Error Message */}
      {apiResponse?.error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p>{apiResponse.error}</p>
          {apiResponse.details && (
            <ul className="mt-2 list-disc list-inside">
              {apiResponse.details.map((detail, index) => (
                <li key={index}>{detail.message}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="groupName" className="font-medium">
            Group Name
          </label>
          <input
            type="text"
            id="groupName"
            className="border border-gray-300 rounded-md p-2"
            placeholder="Enter group name"
            required
            {...register("groupName")}
          />
          {errors.groupName && (
            <span className="text-red-500">{errors.groupName.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <textarea
            id="description"
            className="border border-gray-300 rounded-md p-2"
            placeholder="Enter group description"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="theme" className="font-medium">
            Theme
          </label>
          <select
            id="theme"
            className="border border-gray-300 rounded-md p-2"
            {...register("theme")}
          >
            <option value="/trip.svg" className="text-black">
              Trip
            </option>
            <option value="/party.svg" className="text-black">
              Celebration
            </option>
            <option value="/eat.svg" className="text-black">
              Food Trip
            </option>
          </select>
          {errors.theme && (
            <span className="text-red-500">{errors.theme.message}</span>
          )}
        </div>
        <Button
          type="submit"
          className="mt-8 bg-green-600 hover:bg-green-700 cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "+ Create Group"
          )}
        </Button>
      </form>
    </>
  )
}
