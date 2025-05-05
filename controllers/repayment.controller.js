import { Loan } from "../models/loan.model.js";
import { Repayment } from "../models/repayment.model.js";
import { Customer } from "../models/customer.model.js";

export const createRepayment = async (req, res) => {
  const { loanId, amount } = req.body;
  const shopkeeperId = req.userId;

  try {
    const repayment = new Repayment({
      loanId,
      amount,
      shopkeeperId,
    });
    await repayment.save();

    res.status(200).json({ message: "Repayment successful", repayment });
  } catch (error) {
    console.error("Error while retriving customers", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getRepayments = async (req, res) => {
  try {
    const shopkeeperId = req.userId;

    const repayments = await Repayment.find({ shopkeeperId });

    res
      .status(200)
      .json({ message: "repayments retrived successfully!", repayments });
  } catch (error) {
    console.error("Error while retriving customers", error);
    res.status(500).json({ message: "Server error", error });
  }
};
