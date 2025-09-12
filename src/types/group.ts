type Member = {
  userId: string
  joinedAt: string
}

export type Group = {
  _id: string
  name: string
  description: string
  theme: string
  inviteCode: string
  totalExpenses: number
  youOwe: number
  owedToYou: number
  members: Member[]
  createdAt: string
  updatedAt: string
}
