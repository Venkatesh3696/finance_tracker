import mongoose, { model, Schema } from "mongoose";

const repaymentSchema = new Schema(
  {
    loanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
      required: true,
    },

    shopkeeperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shopkeeper",
      required: true,
    },
    amount: Number,

    date: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

repaymentSchema.pre("save", async function (next) {
  try {
    console.log("amount in trepayment", this.amount);
    const loan = await mongoose.model("Loan").findById(this.loanId);
    if (!loan) {
      throw new Error("Loan not found");
    }

    console.log("loan balance =>> after repayment, => ", loan.balance);
    loan.balance = loan.balance - this.amount;

    loan.isLoanPartiallyCleared = loan.balance > 0;

    await loan.save();
    next();
  } catch (error) {
    next(error);
  }
});

export const Repayment = model("Repayment", repaymentSchema);
