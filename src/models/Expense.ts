import mongoose from "mongoose"

const ExpenseSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "food",
        "transportation",
        "accommodation",
        "entertainment",
        "utilities",
      ],
      default: "entertainment",
    },
    paidBy: {
      type: String,
      required: true,
    },
    splitType: {
      type: String,
      enum: ["equal", "custom"],
      default: "equal",
    },
    splits: [
      {
        userId: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        percentage: {
          type: Number,
          default: 0,
        },
      },
    ],
    receipt: {
      type: String,
    },
    notes: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isSettled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Expense ||
  mongoose.model("Expense", ExpenseSchema)
