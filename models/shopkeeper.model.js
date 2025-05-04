import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const shopkeeperSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

shopkeeperSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

shopkeeperSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

shopkeeperSchema.methods.generateToken = function () {
  const payload = { userId: this._id };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
};

export const Shopkeeper = model("Shopkeeper", shopkeeperSchema);
