import { Group } from "@/types/group"
import Image from "next/image"

type GroupCardProps = {
  group: Group
}

export default function GroupCard({ group }: GroupCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer hover:scale-105 duration-200 transition-all ">
      <h2 className="text-2xl font-semibold mb-2">{group.name}</h2>
      <div className="border my-2">
        <Image src={group.theme} alt={group.name} width={400} height={200} />
      </div>
      <p className="text-gray-600">Members: {group.members.length}</p>
      <div>
        <p className="text-gray-600">Total Expenses: ${group.totalExpenses}</p>
        <p className="text-gray-600">You Owe: ${group.youOwe}</p>
        <p className="text-gray-600">Owed to you: ${group.owedToYou}</p>
      </div>
    </div>
  )
}
