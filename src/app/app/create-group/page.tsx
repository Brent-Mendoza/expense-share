import { Group } from "lucide-react"
import GroupForm from "./_components/GroupForm"

export default function CreateGroup() {
  return (
    <main className="flex-1 p-4 ">
      <section>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <Group />
            Add Groups
          </h1>
        </div>
      </section>
      <section>
        <div className="mt-8">
          <GroupForm />
        </div>
      </section>
    </main>
  )
}
