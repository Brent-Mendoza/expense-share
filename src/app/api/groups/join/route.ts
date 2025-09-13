import { connectDB } from "@/lib/mongodb"
import Group from "@/models/Group"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import z from "zod/v3"

const InviteCodeSchema = z.object({
  inviteCode: z.string().min(1, "Please enter the invite code..."),
})

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: "You must be logged in to join a group" },
        { status: 401 }
      )
    }

    const body = await request.json()

    const validateData = InviteCodeSchema.parse(body)

    await connectDB()
    const group = await Group.findOne({ inviteCode: validateData.inviteCode })
    if (!group) {
      return NextResponse.json(
        { error: "Invalid invite code. Please check and try again." },
        { status: 404 }
      )
    }

    const existingMember = group.members.find(
      (member: any) => member.userId === userId
    )
    if (existingMember) {
      return NextResponse.json(
        { error: "You are already a member of this group" },
        { status: 409 }
      )
    }

    group.members.push({
      userId: userId,
      joinedAt: new Date(),
    })

    await group.save()

    return NextResponse.json(
      {
        message: `Successfully joined "${group.name}"!`,
        groupName: group.name,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error joining group:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to join group. Please try again." },
      { status: 500 }
    )
  }
}
