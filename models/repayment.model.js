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

  loanId: ObjectId,
  amount: Number,
  date: Date,
});

export const Shopkeeper = Model("Customer", CustomerSchema);
