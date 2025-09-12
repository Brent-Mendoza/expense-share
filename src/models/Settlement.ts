import mongoose from "mongoose"

const SettlementSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    fromUser: {
      type: String, // Clerk user ID (person paying)
      required: true,
    },
    toUser: {
      type: String, // Clerk user ID (person receiving)
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    method: {
      type: String,
      enum: ["cash", "bank_transfer", "gcash", "paymaya", "other"],
      default: "cash",
    },
    notes: {
      type: String,
      default: "",
    },
    proof: {
      type: String, // URL to payment proof image
      default: null,
    },
    confirmedBy: {
      receiver: {
        type: Boolean,
        default: false,
      },
      payer: {
        type: Boolean,
        default: true, // Auto-confirm for payer
      },
    },
    settledAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Settlement ||
  mongoose.model("Settlement", SettlementSchema)
