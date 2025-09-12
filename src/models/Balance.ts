import mongoose from "mongoose"

const BalanceSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    userBalances: [
      {
        userId: {
          type: String,
          required: true,
        },
        totalPaid: {
          type: Number,
          default: 0,
        },
        totalOwed: {
          type: Number,
          default: 0,
        },
        netBalance: {
          type: Number,
          default: 0,
        },
      },
    ],
    lastCalculated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Balance ||
  mongoose.model("Balance", BalanceSchema)
