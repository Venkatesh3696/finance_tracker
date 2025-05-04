import { Model, Schema } from "mongoose";

export const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userId: ObjectId,

  userId: ObjectId,
  customerId: ObjectId,
  itemDescription: String,
  loanAmount: Number,
  issueDate: Date,
  dueDate: Date,
  frequency: String,
  interestRate: Number,
  graceDays: Number,
  status: String, // pending, paid, overdue
});

export const Shopkeeper = Model("Customer", CustomerSchema);
