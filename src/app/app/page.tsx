import { Button } from "@/components/ui/button"
import { Group } from "lucide-react"
import GroupCard from "./_components/GroupCard"
import Link from "next/link"
import { cookies } from "next/headers"
import { Group as TGroup } from "@/types/group"
import JoinButton from "./_components/JoinButton"

export default async function AppPage() {
  const cookieStore = await cookies()
  const res = await fetch(`${process.env.FRONTEND_URL}/api/groups`, {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  })
  const data: { groups: TGroup[] } = await res.json()
  return (
    <main className="flex-1 p-4 ">
      <section>
        <div className=" flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold flex items-center gap-2">
              <Group />
              Groups
            </h1>
            <Link href="/app/create-group" className="self-start">
              <Button className="self-start cursor-pointer hover:scale-105">
                +Create Group
              </Button>
            </Link>
          </div>
          <div>
            <JoinButton />
          </div>
        </div>
      </section>
      <section className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 ">
          {/* Example group cards */}
          {data.groups.map((group) => (
            <GroupCard key={group._id} group={group} />
          ))}
        </div>
      </section>
    </main>
  )
}
