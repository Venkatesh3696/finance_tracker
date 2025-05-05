import { Model, Schema } from "mongoose";

const repaymentSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: "Loan", required: true },
  amount: Number,
  date: Date,
});

export const Shopkeeper = Model("Repayment", repaymentSchema);
