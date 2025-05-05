import mongoose, { model, Schema } from "mongoose";
import { Loan } from "./loan.model.js";

export const customerSchema = new Schema(
  {
    shopkeeperId: {
      type: mongoose.ObjectId,
      ref: "Shopkeeper",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: String,

    trustScore: { type: Number, default: 10 },
    creditLimit: { type: Number, default: 50000 },

    totalLoanAmount: { type: Number, default: 0 },
    totalOutstandingBalance: { type: Number, default: 0 },
    totalActiveLoanAmount: { type: Number, default: 0 },
    totalOverdueLoanAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

customerSchema.methods.updateLoanStats = async function () {
  const loans = await Loan.find({ customerId: this._id });

  this.totalLoanAmount = loans.reduce(
    (total, loan) => total + loan.loanAmount,
    0
  );

  this.totalOutstandingBalance = loans.reduce(
    (total, loan) => total + loan.balance,
    0
  );

  this.totalActiveLoanAmount = loans
    .filter((loan) => loan.balance > 0)
    .reduce((total, loan) => total + loan.balance, 0);

  this.totalOverdueLoanAmount = loans
    .filter((loan) => loan.balance > 0 && loan.dueDate < new Date())
    .reduce((total, loan) => total + loan.balance, 0);
};

customerSchema.pre("save", async function (next) {
  await this.updateLoanStats();
  next();
});

customerSchema.post(["find", "findOne"], async function (docs) {
  if (!docs) return;

  if (Array.isArray(docs)) {
    await Promise.all(docs.map((doc) => doc?.updateLoanStats()));
  } else {
    await docs.updateLoanStats();
  }
});

export const Customer = model("Customer", customerSchema);
