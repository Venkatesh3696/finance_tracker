import { model, Schema, mongoose } from "mongoose";

const loanSchema = new Schema(
  {
    shopkeeperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shopkeeper",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    loanAmount: {
      type: Number,
      required: true,
      min: [1, "Loan amount must be greater than 0"],
    },
    isLoanPartiallyCleared: {
      type: Boolean,
      default: false,
    },
    itemDescription: String,
    balance: Number,
    issueDate: { type: Date, default: new Date() },

    frequency: {
      type: String,
      enum: ["bi-weekly", "monthly"],
      default: "bi-weekly",
    },

    dueDate: { type: Date },

    graceDays: { type: Number, default: 5 },

    status: {
      type: String,
      enum: ["pending", "paid", "overdue"],
      default: "pending",
    },
  },
  { timestamps: true }
);

loanSchema.pre("save", function (next) {
  if (this.isNew) {
    this.balance = this.loanAmount;
  }
  next();
});

loanSchema.pre("save", function (next) {
  console.log("in pre save", this.balance);
  if (this.balance > 0) {
    if (this.dueDate < new Date()) {
      this.status = "overdue";
    } else {
      this.status = "pending";
    }
  } else {
    this.status = "paid";
  }

  next();
});

loanSchema.pre("save", function (next) {
  if (this.dueDate) return next();

  const start = new Date(this.issueDate);

  if (this.frequency === "bi-weekly") {
    this.dueDate = new Date(start.setDate(start.getDate() + 14));
  } else if (this.frequency === "monthly") {
    this.dueDate = new Date(start.setMonth(start.getMonth() + 1));
  }

  next();
});

export const Loan = model("Loan", loanSchema);
