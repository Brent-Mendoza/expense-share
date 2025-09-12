import { connectDB } from "@/lib/mongodb"
import Balance from "@/models/Balance"
import Group from "@/models/Group"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import z from "zod/v3"

const CreateGroupSchema = z.object({
  groupName: z.string().min(1, "Group name is required"),
  description: z.string().optional(),
  theme: z.string(),
})

function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const body = await request.json()

    const validateData = CreateGroupSchema.parse(body)

    await connectDB()

    let inviteCode = generateInviteCode()
    let existingGroup = await Group.findOne({ inviteCode })

    while (existingGroup) {
      inviteCode = generateInviteCode()
      existingGroup = await Group.findOne({ inviteCode })
    }

    const newGroup = new Group({
      name: validateData.groupName,
      description: validateData.description || "",
      theme: validateData.theme || "/trip.svg",
      inviteCode,
      members: [{ userId }],
      totalExpenses: 0,
    })

    await newGroup.save()

    return NextResponse.json(
      { message: "Group created successfully", group: newGroup },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating group:", error)

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors,
        },
        { status: 400 }
      )
    }

    // Handle duplicate key errors
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return NextResponse.json(
        { error: "Group with this invite code already exists" },
        { status: 409 }
      )
    }

    // Generic error response
    return NextResponse.json(
      { error: "Failed to create group" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const groups = await Group.find({
      members: { $elemMatch: { userId } },
    })
      .sort({ createdAt: -1 })
      .lean()

    // Fetch balances for each group
    const balances = await Balance.find({
      groupId: { $in: groups.map((g) => g._id) },
    }).lean()

    // Merge balance info into groups
    const groupsWithBalances = groups.map((g) => {
      const balance = balances.find(
        (b) => b.groupId.toString() === g._id?.toString()
      )

      let youOwe = 0
      let owedToYou = 0

      if (balance) {
        const yourBalance = balance.userBalances.find(
          (ub: any) => ub.userId === userId
        )
        if (yourBalance) {
          youOwe = yourBalance.totalOwed
          owedToYou = yourBalance.netBalance > 0 ? yourBalance.netBalance : 0
        }
      }

      return {
        ...g,
        youOwe,
        owedToYou,
      }
    })

    return NextResponse.json({ groups: groupsWithBalances }, { status: 200 })
  } catch (error) {
    console.error("Error fetching groups:", error)
    return NextResponse.json(
      { error: "Failed to fetch groups" },
      { status: 500 }
    )
  }
}
